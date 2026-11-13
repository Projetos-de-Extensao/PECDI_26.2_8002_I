import { useState } from 'react'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import { CAMPI } from '../../dados.js'
import { ocupacao } from '../../regras.js'

export default function PrepararEdicao({ dados, onSalvarConfig, onAdicionarSala, onImportarAlunos }) {
  const { edicao, salas, alunos } = dados

  // Formulário da configuração (começa com o que está salvo)
  const [config, setConfig] = useState({ data: edicao.data, hora: edicao.hora, campus: edicao.campus })

  // Formulário da nova sala
  const [sala, setSala] = useState({ codigo: '', predio: '', capacidade: '', recursos: '' })
  const [erroSala, setErroSala] = useState('')

  function salvarConfig(e) {
    e.preventDefault()
    onSalvarConfig(config)
  }

  function adicionarSala(e) {
    e.preventDefault()
    const capacidade = Number(sala.capacidade)

    if (sala.codigo === '' || sala.predio === '') {
      setErroSala('Informe o código da sala e o prédio.')
    } else if (capacidade < 1) {
      setErroSala('A capacidade deve ser maior que zero.')
    } else if (salas.some((s) => s.codigo === sala.codigo)) {
      setErroSala(`Já existe uma sala com o código ${sala.codigo}.`)
    } else {
      onAdicionarSala({ ...sala, capacidade, recursos: sala.recursos || '—' })
      setSala({ codigo: '', predio: '', capacidade: '', recursos: '' })
      setErroSala('')
    }
  }

  return (
    <>
      <TituloPagina titulo="Preparar edição" subtitulo="Configuração da prova, salas disponíveis e lista de alunos." />

      {/* ---------- 1. Configuração ---------- */}
      <section className="cartao">
        <h2>1. Configuração da prova</h2>
        <form onSubmit={salvarConfig} className="form-linha">
          <div className="campo">
            <label htmlFor="data">Data</label>
            <input id="data" type="date" value={config.data} onChange={(e) => setConfig({ ...config, data: e.target.value })} />
          </div>
          <div className="campo">
            <label htmlFor="hora">Horário</label>
            <input id="hora" type="time" value={config.hora} onChange={(e) => setConfig({ ...config, hora: e.target.value })} />
          </div>
          <div className="campo">
            <label htmlFor="campus">Campus</label>
            <select id="campus" value={config.campus} onChange={(e) => setConfig({ ...config, campus: e.target.value })}>
              {CAMPI.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="botao botao--primario">
            Salvar
          </button>
        </form>
      </section>

      {/* ---------- 2. Salas ---------- */}
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
                  <td>{ocupacao(edicao.alocacao, s.id)}</td>
                  <td>{s.recursos}</td>
                  <td>
                    {s.ativa ? (
                      <span className="selo selo--ok">Disponível</span>
                    ) : (
                      <span className="selo selo--erro">Interditada</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Cadastrar sala</h3>
        <form onSubmit={adicionarSala} className="form-linha">
          <div className="campo">
            <label htmlFor="codigo">Código</label>
            <input id="codigo" placeholder="ex.: C301" value={sala.codigo} onChange={(e) => setSala({ ...sala, codigo: e.target.value })} />
          </div>
          <div className="campo">
            <label htmlFor="predio">Prédio</label>
            <input id="predio" placeholder="ex.: Prédio C" value={sala.predio} onChange={(e) => setSala({ ...sala, predio: e.target.value })} />
          </div>
          <div className="campo campo--curto">
            <label htmlFor="capacidade">Capacidade</label>
            <input id="capacidade" type="number" placeholder="30" value={sala.capacidade} onChange={(e) => setSala({ ...sala, capacidade: e.target.value })} />
          </div>
          <div className="campo">
            <label htmlFor="recursos">Recursos</label>
            <input id="recursos" placeholder="ex.: Projetor" value={sala.recursos} onChange={(e) => setSala({ ...sala, recursos: e.target.value })} />
          </div>
          <button type="submit" className="botao">
            Adicionar sala
          </button>
        </form>
        {erroSala && <Aviso tipo="erro">{erroSala}</Aviso>}
      </section>

      {/* ---------- 3. Alunos ---------- */}
      <section className="cartao">
        <h2>3. Alunos</h2>
        {!edicao.alunosCarregados ? (
          <>
            <Aviso tipo="info">Nenhuma lista carregada. No sistema real, aqui entraria um arquivo CSV da secretaria.</Aviso>
            <button className="botao botao--primario" onClick={onImportarAlunos}>
              Importar lista de exemplo
            </button>
          </>
        ) : (
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
                      {a.pendencia ? (
                        <span className="selo selo--erro">Pendência: {a.pendencia}</span>
                      ) : (
                        <span className="selo selo--ok">Apto</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  )
}
