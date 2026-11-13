import { useState } from 'react'
import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'

export default function Listas({ dados }) {
  const { edicao, salas, alunos } = dados
  const [filtro, setFiltro] = useState('todas')
  const [busca, setBusca] = useState('')

  if (!edicao.gerada) {
    return (
      <>
        <TituloPagina titulo="Listas" />
        <Aviso tipo="info">
          <Link to="/coordenacao/distribuicao">Gere a distribuição</Link> para ver as listas por sala.
        </Aviso>
      </>
    )
  }

  // Só alunos com sala, da sala escolhida e com o nome buscado
  const lista = alunos.filter((a) => {
    const salaDoAluno = edicao.alocacao[a.id]
    const temSala = salaDoAluno !== undefined
    const passaFiltro = filtro === 'todas' || salaDoAluno === filtro
    const passaBusca = a.nome.toLowerCase().includes(busca.toLowerCase())
    return temSala && passaFiltro && passaBusca
  })

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
            <input id="busca" placeholder="Nome" value={busca} onChange={(e) => setBusca(e.target.value)} />
          </div>
          <button className="botao botao-imprimir" onClick={() => window.print()}>
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
              {lista.map((a) => {
                const sala = salas.find((s) => s.id === edicao.alocacao[a.id])
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
