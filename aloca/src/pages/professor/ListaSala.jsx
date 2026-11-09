import { useState } from 'react'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import { alunosDaSala, formatarData } from '../../regras.js'

export default function ListaSala({ config, salas, alunos, alocacao, publicada, atualizadoEm }) {
  const [salaId, setSalaId] = useState((salas.find((s) => s.ativa) ?? salas[0]).id)
  const [presentes, setPresentes] = useState({}) // { idDoAluno: true }

  if (!publicada) {
    return (
      <>
        <TituloPagina titulo="Minha sala" />
        <Aviso tipo="info">A lista da sala ainda não foi publicada pela coordenação. Volte mais tarde.</Aviso>
      </>
    )
  }

  const sala = salas.find((s) => s.id === Number(salaId))
  const lista = alunosDaSala(alunos, alocacao, sala.id)
  const totalPresentes = lista.filter((a) => presentes[a.id]).length

  function alternar(id) {
    setPresentes((anterior) => ({ ...anterior, [id]: !anterior[id] }))
  }

  return (
    <>
      <TituloPagina
        titulo="Minha sala"
        subtitulo={`${formatarData(config.data)} às ${config.hora} · ${config.campus}`}
      />

      <section className="cartao">
        <div className="form-linha">
          <div className="campo">
            <label htmlFor="sala">Sala que vou fiscalizar</label>
            <select id="sala" value={salaId} onChange={(e) => setSalaId(e.target.value)}>
              {salas.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.codigo} ({s.predio}){s.ativa ? '' : ' – interditada'}
                </option>
              ))}
            </select>
          </div>
          <p className="suave">Lista atualizada às {atualizadoEm}</p>
        </div>

        {!sala.ativa && (
          <Aviso tipo="erro">
            Esta sala foi interditada e os alunos foram remanejados. Consulte a lista da nova sala.
          </Aviso>
        )}

        <div className="linha linha--entre">
          <h2>
            Sala {sala.codigo} · {sala.predio}
          </h2>
          <span className="selo selo--ok">
            {totalPresentes} de {lista.length} presentes
          </span>
        </div>

        <div className="tabela">
          <table>
            <thead>
              <tr>
                <th>Presente</th>
                <th>Aluno</th>
                <th>Matrícula</th>
              </tr>
            </thead>
            <tbody>
              {lista.length === 0 && (
                <tr>
                  <td colSpan="3">Nenhum aluno nesta sala.</td>
                </tr>
              )}
              {lista.map((a) => (
                <tr key={a.id} className={presentes[a.id] ? 'linha-presente' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      className="presenca"
                      checked={!!presentes[a.id]}
                      onChange={() => alternar(a.id)}
                      aria-label={`Presença de ${a.nome}`}
                    />
                  </td>
                  <td>{a.nome}</td>
                  <td>{a.matricula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
