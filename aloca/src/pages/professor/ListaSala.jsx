import { useState } from 'react'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import { formatarData, salasAtivas } from '../../regras.js'

export default function ListaSala({ dados, onAtualizar }) {
  const { edicao, salas, alunos } = dados
  const [salaId, setSalaId] = useState(salasAtivas(salas)[0]?.id)
  const [presentes, setPresentes] = useState([]) // ids dos alunos marcados

  if (!edicao.publicada) {
    return (
      <>
        <TituloPagina titulo="Minha sala" />
        <Aviso tipo="info">A lista da sala ainda não foi publicada pela coordenação.</Aviso>
        <button className="botao" onClick={onAtualizar}>
          Verificar de novo
        </button>
      </>
    )
  }

  const sala = salas.find((s) => s.id === salaId)
  const lista = alunos.filter((a) => edicao.alocacao[a.id] === salaId)

  // Marca ou desmarca a presença do aluno
  function alternar(id) {
    if (presentes.includes(id)) {
      setPresentes(presentes.filter((p) => p !== id))
    } else {
      setPresentes([...presentes, id])
    }
  }

  return (
    <>
      <TituloPagina titulo="Minha sala" subtitulo={`${formatarData(edicao.data)} às ${edicao.hora} · ${edicao.campus}`} />

      <section className="cartao">
        <div className="form-linha">
          <div className="campo">
            <label htmlFor="sala">Sala que vou fiscalizar</label>
            <select id="sala" value={salaId} onChange={(e) => setSalaId(e.target.value)}>
              {salas.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.codigo} ({s.predio}) {s.ativa ? '' : '– interditada'}
                </option>
              ))}
            </select>
          </div>
          <button className="botao" onClick={onAtualizar}>
            Atualizar lista
          </button>
        </div>

        {!sala.ativa && (
          <Aviso tipo="erro">Esta sala foi interditada e os alunos foram remanejados. Consulte a lista da nova sala.</Aviso>
        )}

        <div className="linha linha--entre">
          <h2>
            Sala {sala.codigo} · {sala.predio}
          </h2>
          <span className="selo selo--ok">
            {lista.filter((a) => presentes.includes(a.id)).length} de {lista.length} presentes
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
              {lista.map((a) => (
                <tr key={a.id} className={presentes.includes(a.id) ? 'linha-presente' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      className="presenca"
                      checked={presentes.includes(a.id)}
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
