import { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Aviso from './components/Aviso.jsx'

import Acesso from './pages/Acesso.jsx'
import Inscricao from './pages/aluno/Inscricao.jsx'
import MinhaProva from './pages/aluno/MinhaProva.jsx'
import Painel from './pages/coordenacao/Painel.jsx'
import PrepararEdicao from './pages/coordenacao/PrepararEdicao.jsx'
import Distribuicao from './pages/coordenacao/Distribuicao.jsx'
import Remanejamento from './pages/coordenacao/Remanejamento.jsx'
import Listas from './pages/coordenacao/Listas.jsx'
import ListaSala from './pages/professor/ListaSala.jsx'

import * as api from './api.js'
import { ALUNO_LOGADO, INICIO } from './dados.js'
import { alunosAptos, gerarDistribuicao, horaAgora } from './regras.js'

export default function App() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState(null) // quem entrou: { perfil, identificacao }
  const [dados, setDados] = useState(null) // o que veio da API: { edicao, salas, alunos }
  const [erro, setErro] = useState(null)

  // Busca tudo na API (GET /edicao, /salas e /alunos)
  function carregar() {
    return Promise.all([api.lerEdicao(), api.listarSalas(), api.listarAlunos()])
      .then(([edicao, salas, alunos]) => {
        setDados({ edicao, salas, alunos })
        setErro(null)
      })
      .catch(() => setErro('Não foi possível conectar à API. Rode npm run api na pasta aloca.'))
  }

  // Quando o app abre, busca os dados
  useEffect(() => {
    carregar()
  }, [])

  // Espera a gravação terminar na API e busca os dados de novo
  async function salvar(gravacao) {
    try {
      await gravacao
      await carregar()
    } catch {
      setErro('Não foi possível salvar. Confira se a API está rodando (npm run api).')
    }
  }

  // Enquanto os dados não chegam, mostra só uma mensagem
  if (!dados) {
    return (
      <div className="app perfil-acesso">
        <Header perfil="acesso" />
        <main className="conteudo">
          {erro ? <Aviso tipo="erro">{erro}</Aviso> : <p className="suave">Carregando…</p>}
          {erro && (
            <button className="botao botao--primario" onClick={carregar}>
              Tentar de novo
            </button>
          )}
        </main>
        <Footer perfil="acesso" />
      </div>
    )
  }

  const { edicao, salas, alunos } = dados

  // Acrescenta uma linha com a hora no registro de alterações
  function registrar(texto) {
    return [...edicao.registro, `${horaAgora()} – ${texto}`]
  }

  // ---------- Ações (cada uma grava na API) ----------
  function entrar(perfil, identificacao) {
    setUsuario({ perfil, identificacao })
    navigate(INICIO[perfil])
  }

  function sair() {
    setUsuario(null)
    navigate('/')
  }

  function inscrever() {
    salvar(api.atualizarAluno(ALUNO_LOGADO, { inscrito: true }))
  }

  function salvarConfig(config) {
    salvar(api.atualizarEdicao(config))
  }

  function importarAlunos() {
    salvar(api.atualizarEdicao({ alunosCarregados: true }))
  }

  function adicionarSala(sala) {
    salvar(api.criarSala({ ...sala, ativa: true }))
  }

  function gerar() {
    const inscrito = alunos.find((a) => a.id === ALUNO_LOGADO).inscrito
    const aptos = alunosAptos(alunos, inscrito)
    salvar(
      api.atualizarEdicao({
        alocacao: gerarDistribuicao(aptos, salas),
        gerada: true,
        registro: [`${horaAgora()} – Distribuição gerada.`],
      }),
    )
  }

  function moverAluno(aluno, sala) {
    salvar(
      api.atualizarEdicao({
        alocacao: { ...edicao.alocacao, [aluno.id]: sala.id },
        registro: registrar(`Ajuste manual: ${aluno.nome} → ${sala.codigo}.`),
      }),
    )
  }

  function publicar() {
    salvar(api.atualizarEdicao({ publicada: true, registro: registrar('Distribuição publicada.') }))
  }

  function remanejar(origem, destino) {
    // todos os alunos da sala de origem vão para a sala de destino
    const alocacao = { ...edicao.alocacao }
    let quantidade = 0
    for (const idAluno in alocacao) {
      if (alocacao[idAluno] === origem.id) {
        alocacao[idAluno] = destino.id
        quantidade++
      }
    }
    const avisoAluno = `Sua sala mudou de ${origem.codigo} para ${destino.codigo}. Confira o comprovante atualizado.`

    // três gravações ao mesmo tempo: interdita a sala, grava a alocação e avisa o aluno logado (se ele mudou)
    salvar(
      Promise.all([
        api.atualizarSala(origem.id, { ativa: false }),
        api.atualizarEdicao({
          alocacao,
          registro: registrar(`Remanejamento: ${quantidade} aluno(s) de ${origem.codigo} para ${destino.codigo}.`),
        }),
        edicao.alocacao[ALUNO_LOGADO] === origem.id && api.atualizarAluno(ALUNO_LOGADO, { aviso: avisoAluno }),
      ]),
    )
  }

  const perfil = usuario ? usuario.perfil : 'acesso'

  return (
    <div className={`app perfil-${perfil}`}>
      <Header perfil={perfil} identificacao={usuario?.identificacao} onSair={sair} />

      <main className="conteudo">
        {erro && <Aviso tipo="erro">{erro}</Aviso>}

        <Routes>
          <Route path="/" element={<Acesso onEntrar={entrar} />} />

          {/* Cada perfil só enxerga as próprias telas */}
          {perfil === 'aluno' && (
            <>
              <Route path="/aluno/inscricao" element={<Inscricao dados={dados} onInscrever={inscrever} />} />
              <Route path="/aluno/prova" element={<MinhaProva dados={dados} />} />
            </>
          )}

          {perfil === 'coordenacao' && (
            <>
              <Route path="/coordenacao/painel" element={<Painel dados={dados} />} />
              <Route
                path="/coordenacao/preparar"
                element={
                  <PrepararEdicao
                    dados={dados}
                    onSalvarConfig={salvarConfig}
                    onAdicionarSala={adicionarSala}
                    onImportarAlunos={importarAlunos}
                  />
                }
              />
              <Route
                path="/coordenacao/distribuicao"
                element={<Distribuicao dados={dados} onGerar={gerar} onMover={moverAluno} onPublicar={publicar} />}
              />
              <Route path="/coordenacao/remanejamento" element={<Remanejamento dados={dados} onRemanejar={remanejar} />} />
              <Route path="/coordenacao/listas" element={<Listas dados={dados} />} />
            </>
          )}

          {perfil === 'professor' && (
            <Route path="/professor/sala" element={<ListaSala dados={dados} onAtualizar={carregar} />} />
          )}

          {/* Qualquer outro endereço volta para o login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      <Footer perfil={perfil} />
    </div>
  )
}
