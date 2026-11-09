import { useState } from 'react'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import { CAMPI } from '../../dados.js'
import { alunosComPendencia, ocupacao } from '../../regras.js'

function Configuracao({ config, onSalvar }) {
  // Cópia local do formulário: só vai para o App quando clicar em Salvar
  const [form, setForm] = useState(config)
  const [mensagem, setMensagem] = useState(null)

  function salvar(e) {
    e.preventDefault()
    if (!form.data || !form.hora) {
      setMensagem({ tipo: 'erro', texto: 'Preencha a data e o horário.' })
      return
    }
    onSalvar(form)
    setMensagem({ tipo: 'ok', texto: 'Configuração salva.' })
  }

  return (
    <section className="cartao">
      <h2>1. Configuração da prova</h2>
      <form onSubmit={salvar} className="form-linha">
        <div className="campo">
          <label htmlFor="data">Data</label>
          <input id="data" type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} />
        </div>
        <div className="campo">
          <label htmlFor="hora">Horário</label>
          <input id="hora" type="time" value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })} />
        </div>
        <div className="campo">
          <label htmlFor="campus">Campus</label>
          <select id="campus" value={form.campus} onChange={(e) => setForm({ ...form, campus: e.target.value })}>
            {CAMPI.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="botao botao--primario">
          Salvar
        </button>
      </form>
      {mensagem && <Aviso tipo={mensagem.tipo}>{mensagem.texto}</Aviso>}
    </section>
  )
}

const SALA_VAZIA = { codigo: '', predio: '', capacidade: '', recursos: '' }

function Salas({ salas, alocacao, onAdicionar }) {
  const [nova, setNova] = useState(SALA_VAZIA)
  const [mensagem, setMensagem] = useState(null)

  function adicionar(e) {
    e.preventDefault()
    const codigo = nova.codigo.trim()
    const capacidade = parseInt(nova.capacidade, 10)
    if (!codigo || !nova.predio.trim()) {
      setMensagem({ tipo: 'erro', texto: 'Informe o código da sala e o prédio.' })
      return
    }
    if (!(capacidade >= 1)) {
      setMensagem({ tipo: 'erro', texto: 'A capacidade deve ser um número maior que zero.' })
      return
    }
    if (salas.some((s) => s.codigo.toLowerCase() === codigo.toLowerCase())) {
      setMensagem({ tipo: 'erro', texto: `Já existe uma sala com o código ${codigo}.` })
      return
    }
    onAdicionar({ codigo, predio: nova.predio.trim(), capacidade, recursos: nova.recursos.trim() || '—' })
    setNova(SALA_VAZIA)
    setMensagem({ tipo: 'ok', texto: `Sala ${codigo} cadastrada.` })
  }

  return (
    <section className="cartao">
      <h2>2. Salas</h2>
      <div className="tabela">
        <table>
          <thead>
            <tr>
              <th>Sala</th>
              <th>Prédio</th>
              <th>Capacidade</th>
              <th>Ocupação</th>
              <th>Recursos</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {salas.map((s) => (
              <tr key={s.id}>
                <td>
                  <strong>{s.codigo}</strong>
                </td>
                <td>{s.predio}</td>
                <td>{s.capacidade}</td>
                <td>{ocupacao(alocacao, s.id)}</td>
                <td>{s.recursos}</td>
                <td>
                  <span className={`selo ${s.ativa ? 'selo--ok' : 'selo--erro'}`}>
                    {s.ativa ? 'Disponível' : 'Interditada'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Cadastrar sala</h3>
      <form onSubmit={adicionar} className="form-linha">
        <div className="campo">
          <label htmlFor="codigo">Código</label>
          <input id="codigo" placeholder="ex.: C301" value={nova.codigo} onChange={(e) => setNova({ ...nova, codigo: e.target.value })} />
        </div>
        <div className="campo">
          <label htmlFor="predio">Prédio</label>
          <input id="predio" placeholder="ex.: Prédio C" value={nova.predio} onChange={(e) => setNova({ ...nova, predio: e.target.value })} />
        </div>
        <div className="campo campo--curto">
          <label htmlFor="capacidade">Capacidade</label>
          <input id="capacidade" type="number" min="1" placeholder="30" value={nova.capacidade} onChange={(e) => setNova({ ...nova, capacidade: e.target.value })} />
        </div>
        <div className="campo">
          <label htmlFor="recursos">Recursos</label>
          <input id="recursos" placeholder="ex.: Projetor" value={nova.recursos} onChange={(e) => setNova({ ...nova, recursos: e.target.value })} />
        </div>
        <button type="submit" className="botao">
          Adicionar sala
        </button>
      </form>
      {mensagem && <Aviso tipo={mensagem.tipo}>{mensagem.texto}</Aviso>}
    </section>
  )
}

function Alunos({ alunos, carregados, onImportar }) {
  const pendentes = alunosComPendencia(alunos)

  return (
    <section className="cartao">
      <h2>3. Alunos</h2>
      {!carregados ? (
        <>
          <Aviso tipo="info">Nenhuma lista carregada. No sistema real, aqui entraria um arquivo CSV da secretaria.</Aviso>
          <button type="button" className="botao botao--primario" onClick={onImportar}>
            Importar lista de exemplo
          </button>
        </>
      ) : (
        <>
          <Aviso tipo="ok">
            Carga confirmada: {alunos.length - pendentes.length} registros válidos e {pendentes.length} com pendência.
            Alunos com pendência ficam fora da distribuição até serem corrigidos.
          </Aviso>
          <div className="tabela">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Matrícula</th>
                  <th>Curso</th>
                  <th>Situação</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map((a) => (
                  <tr key={a.id}>
                    <td>{a.nome}</td>
                    <td>{a.matricula || '—'}</td>
                    <td>{a.curso || '—'}</td>
                    <td>
                      <span className={`selo ${a.pendencia ? 'selo--erro' : 'selo--ok'}`}>
                        {a.pendencia ? `Pendência: ${a.pendencia}` : 'Apto'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}

export default function PrepararEdicao(props) {
  return (
    <>
      <TituloPagina titulo="Preparar edição" subtitulo="Configuração da prova, salas disponíveis e lista de alunos." />
      <div className="pilha">
        <Configuracao config={props.config} onSalvar={props.onSalvarConfig} />
        <Salas salas={props.salas} alocacao={props.alocacao} onAdicionar={props.onAdicionarSala} />
        <Alunos alunos={props.alunos} carregados={props.alunosCarregados} onImportar={props.onImportarAlunos} />
      </div>
    </>
  )
}
