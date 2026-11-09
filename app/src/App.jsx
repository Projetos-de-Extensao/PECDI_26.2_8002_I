import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import RotaProtegida from './components/RotaProtegida.jsx'

import Acesso from './pages/Acesso.jsx'
import Inscricao from './pages/aluno/Inscricao.jsx'
import MinhaProva from './pages/aluno/MinhaProva.jsx'
import Painel from './pages/coordenacao/Painel.jsx'
import PrepararEdicao from './pages/coordenacao/PrepararEdicao.jsx'
import Distribuicao from './pages/coordenacao/Distribuicao.jsx'
import Remanejamento from './pages/coordenacao/Remanejamento.jsx'
import Listas from './pages/coordenacao/Listas.jsx'
import ListaSala from './pages/professor/ListaSala.jsx'

import { ALUNO_LOGADO, INICIO, CONFIG_INICIAL, SALAS_INICIAIS, ALUNOS_INICIAIS } from './dados.js'
import { alunosAptos, gerarDistribuicao, horaAgora } from './regras.js'

export default function App() {
  const navigate = useNavigate()

  // ---------- Estado do sistema (fica aqui e desce para as telas por props) ----------
  const [usuario, setUsuario] = useState(null) // { perfil, identificacao }
  const [config, setConfig] = useState(CONFIG_INICIAL)
  const [salas, setSalas] = useState(SALAS_INICIAIS)
  const [alunos] = useState(ALUNOS_INICIAIS)
  const [alunosCarregados, setAlunosCarregados] = useState(false)
  const [inscrito, setInscrito] = useState(false)
  const [alocacao, setAlocacao] = useState({}) // { idDoAluno: idDaSala }
  const [gerada, setGerada] = useState(false)
  const [publicada, setPublicada] = useState(false)
  const [registro, setRegistro] = useState([]) // histórico de alterações
  const [atualizadoEm, setAtualizadoEm] = useState('--:--')
  const [avisoAluno, setAvisoAluno] = useState(null)

  const aptos = alunosAptos(alunos, inscrito, ALUNO_LOGADO)

  function registrar(texto) {
    const hora = horaAgora()
    setRegistro((anterior) => [...anterior, `${hora} – ${texto}`])
    setAtualizadoEm(hora)
  }

  // ---------- Ações ----------
  function entrar(perfil, identificacao) {
    setUsuario({ perfil, identificacao })
    navigate(INICIO[perfil])
  }

  function sair() {
    setUsuario(null)
    navigate('/')
  }

  function adicionarSala(sala) {
    setSalas((anterior) => [...anterior, { ...sala, id: anterior.length + 1, ativa: true }])
  }

  function gerar() {
    setAlocacao(gerarDistribuicao(aptos, salas))
    setGerada(true)
    setRegistro([])
    registrar('Distribuição gerada.')
  }

  function moverAluno(aluno, sala) {
    setAlocacao((anterior) => ({ ...anterior, [aluno.id]: sala.id }))
    registrar(`Ajuste manual: ${aluno.nome} → ${sala.codigo}.`)
  }

  function publicar() {
    setPublicada(true)
    registrar('Distribuição publicada.')
  }

  function remanejar(origem, destino, quantidade) {
    const nova = { ...alocacao }
    Object.keys(nova).forEach((idAluno) => {
      if (nova[idAluno] === origem.id) nova[idAluno] = destino.id
    })
    if (alocacao[ALUNO_LOGADO] === origem.id) {
      setAvisoAluno(`Sua sala mudou de ${origem.codigo} para ${destino.codigo}. Confira o comprovante atualizado.`)
    }
    setAlocacao(nova)
    setSalas((anterior) => anterior.map((s) => (s.id === origem.id ? { ...s, ativa: false } : s)))
    registrar(`Remanejamento: ${quantidade} aluno(s) de ${origem.codigo} para ${destino.codigo}. Sala ${origem.codigo} interditada.`)
  }

  const perfil = usuario ? usuario.perfil : 'acesso'

  return (
    <div className={`app perfil-${perfil}`}>
      <Header perfil={perfil} identificacao={usuario?.identificacao} onSair={sair} />

      <main className="conteudo">
        <Routes>
          <Route path="/" element={<Acesso onEntrar={entrar} />} />

          {/* ---------- Aluno ---------- */}
          <Route
            path="/aluno/inscricao"
            element={
              <RotaProtegida usuario={usuario} perfil="aluno">
                <Inscricao
                  aluno={alunos.find((a) => a.id === ALUNO_LOGADO)}
                  config={config}
                  inscrito={inscrito}
                  onInscrever={() => setInscrito(true)}
                />
              </RotaProtegida>
            }
          />
          <Route
            path="/aluno/prova"
            element={
              <RotaProtegida usuario={usuario} perfil="aluno">
                <MinhaProva
                  aluno={alunos.find((a) => a.id === ALUNO_LOGADO)}
                  config={config}
                  salas={salas}
                  alocacao={alocacao}
                  inscrito={inscrito}
                  publicada={publicada}
                  aviso={avisoAluno}
                />
              </RotaProtegida>
            }
          />

          {/* ---------- Coordenação ---------- */}
          <Route
            path="/coordenacao/painel"
            element={
              <RotaProtegida usuario={usuario} perfil="coordenacao">
                <Painel
                  config={config}
                  salas={salas}
                  alunos={alunos}
                  aptos={aptos}
                  alunosCarregados={alunosCarregados}
                  alocacao={alocacao}
                  gerada={gerada}
                  publicada={publicada}
                />
              </RotaProtegida>
            }
          />
          <Route
            path="/coordenacao/preparar"
            element={
              <RotaProtegida usuario={usuario} perfil="coordenacao">
                <PrepararEdicao
                  config={config}
                  onSalvarConfig={setConfig}
                  salas={salas}
                  alocacao={alocacao}
                  onAdicionarSala={adicionarSala}
                  alunos={alunos}
                  alunosCarregados={alunosCarregados}
                  onImportarAlunos={() => setAlunosCarregados(true)}
                />
              </RotaProtegida>
            }
          />
          <Route
            path="/coordenacao/distribuicao"
            element={
              <RotaProtegida usuario={usuario} perfil="coordenacao">
                <Distribuicao
                  salas={salas}
                  alunos={alunos}
                  aptos={aptos}
                  alunosCarregados={alunosCarregados}
                  alocacao={alocacao}
                  gerada={gerada}
                  publicada={publicada}
                  registro={registro}
                  onGerar={gerar}
                  onMover={moverAluno}
                  onPublicar={publicar}
                />
              </RotaProtegida>
            }
          />
          <Route
            path="/coordenacao/remanejamento"
            element={
              <RotaProtegida usuario={usuario} perfil="coordenacao">
                <Remanejamento
                  salas={salas}
                  alocacao={alocacao}
                  publicada={publicada}
                  registro={registro}
                  onRemanejar={remanejar}
                />
              </RotaProtegida>
            }
          />
          <Route
            path="/coordenacao/listas"
            element={
              <RotaProtegida usuario={usuario} perfil="coordenacao">
                <Listas salas={salas} alunos={alunos} alocacao={alocacao} gerada={gerada} />
              </RotaProtegida>
            }
          />

          {/* ---------- Professor (fiscal de sala) ---------- */}
          <Route
            path="/professor/sala"
            element={
              <RotaProtegida usuario={usuario} perfil="professor">
                <ListaSala
                  config={config}
                  salas={salas}
                  alunos={alunos}
                  alocacao={alocacao}
                  publicada={publicada}
                  atualizadoEm={atualizadoEm}
                />
              </RotaProtegida>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer perfil={perfil} />
    </div>
  )
}
