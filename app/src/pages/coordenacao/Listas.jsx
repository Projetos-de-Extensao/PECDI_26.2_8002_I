import { useState } from 'react'
import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'

export default function Listas({ salas, alunos, alocacao, gerada }) {
  const [filtro, setFiltro] = useState('todas')
  const [busca, setBusca] = useState('')

  if (!gerada) {
    return (
      <>
        <TituloPagina titulo="Listas" />
        <Aviso tipo="info">
          <Link to="/coordenacao/distribuicao">Gere a distribuição</Link> para ver as listas por sala.
        </Aviso>
      </>
    )
  }

  const lista = alunos.filter(
    (a) =>
      alocacao[a.id] &&
      (filtro === 'todas' || alocacao[a.id] === Number(filtro)) &&
      a.nome.toLowerCase().includes(busca.toLowerCase()),
  )

  return (
    <>
      <TituloPagina titulo="Listas" subtitulo="Ocupação por sala, para conferência e impressão." />

      <section className="cartao">
        <div className="form-linha nao-imprimir">
          <div className="campo">
            <label htmlFor="filtro">Sala</label>
            <select id="filtro" value={filtro} onChange={(e) => setFiltro(e.target.value)}>
              <option value="todas">Todas as salas</option>
              {salas.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.codigo} ({s.predio})
                </option>
              ))}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="busca">Buscar aluno</label>
            <input id="busca" type="search" placeholder="Nome" value={busca} onChange={(e) => setBusca(e.target.value)} />
          </div>
          <button type="button" className="botao botao-imprimir" onClick={() => window.print()}>
            Imprimir lista
          </button>
        </div>

        <p className="suave">{lista.length} aluno(s)</p>
        <div className="tabela">
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Matrícula</th>
                <th>Sala</th>
                <th>Prédio</th>
              </tr>
            </thead>
            <tbody>
              {lista.length === 0 && (
                <tr>
                  <td colSpan="4">Nenhum aluno encontrado.</td>
                </tr>
              )}
              {lista.map((a) => {
                const sala = salas.find((s) => s.id === alocacao[a.id])
                return (
                  <tr key={a.id}>
                    <td>{a.nome}</td>
                    <td>{a.matricula}</td>
                    <td>
                      <strong>{sala.codigo}</strong>
                    </td>
                    <td>{sala.predio}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
