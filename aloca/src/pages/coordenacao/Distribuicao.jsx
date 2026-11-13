import { useState } from 'react'
import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import Registro from '../../components/Registro.jsx'
import { ALUNO_LOGADO } from '../../dados.js'
import { alunosAptos, ocupacao, salasAtivas } from '../../regras.js'

export default function Distribuicao({ dados, onGerar, onMover, onPublicar }) {
  const { edicao, salas, alunos } = dados
  const { alocacao, gerada, publicada } = edicao

  const ativas = salasAtivas(salas)
  const aptos = alunosAptos(alunos, alunos.find((a) => a.id === ALUNO_LOGADO).inscrito)
  const semSala = aptos.filter((a) => !alocacao[a.id])
  const lugares = ativas.reduce((total, s) => total + s.capacidade, 0)

  // Formulário do ajuste manual
  const [alunoId, setAlunoId] = useState(aptos[0]?.id)
  const [salaId, setSalaId] = useState(ativas[0]?.id)
  const [erroAjuste, setErroAjuste] = useState('')

  function mover(e) {
    e.preventDefault()
    const aluno = alunos.find((a) => a.id === alunoId)
    const sala = salas.find((s) => s.id === salaId)

    if (alocacao[aluno.id] === sala.id) {
      setErroAjuste(`${aluno.nome} já está na sala ${sala.codigo}.`)
    } else if (ocupacao(alocacao, sala.id) >= sala.capacidade) {
      setErroAjuste(`A sala ${sala.codigo} está cheia.`)
    } else {
      onMover(aluno, sala)
      setErroAjuste('')
    }
  }

  if (!edicao.alunosCarregados) {
    return (
      <>
        <TituloPagina titulo="Distribuição" />
        <Aviso tipo="info">
          Importe a lista de alunos primeiro, em <Link to="/coordenacao/preparar">Preparar edição</Link>.
        </Aviso>
      </>
    )
  }

  return (
    <>
      <TituloPagina titulo="Distribuição" subtitulo="Gerar, revisar e publicar a sala de cada aluno." />

      {/* ---------- Resumo e botão de gerar ---------- */}
      <section className="cartao">
        <h2>Resumo</h2>
        <p>
          <strong>{aptos.length}</strong> alunos aptos · <strong>{ativas.length}</strong> salas ·{' '}
          <strong>{lugares}</strong> lugares
        </p>
        {publicada ? (
          <Aviso tipo="ok">
            Distribuição publicada. Mudanças agora são feitas em <Link to="/coordenacao/remanejamento">Remanejamento</Link>.
          </Aviso>
        ) : (
          <button className="botao botao--primario" onClick={onGerar}>
            {gerada ? 'Gerar de novo' : 'Gerar distribuição'}
          </button>
        )}
      </section>

      {/* ---------- Revisão: ocupação de cada sala ---------- */}
      {gerada && (
        <section className="cartao">
          <h2>Revisão</h2>
          {semSala.length > 0 ? (
            <Aviso tipo="erro">Alunos sem sala: {semSala.map((a) => a.nome).join(', ')}.</Aviso>
          ) : (
            <Aviso tipo="ok">Todos os alunos aptos têm sala.</Aviso>
          )}

          <div className="tabela">
            <table>
              <thead>
                <tr>
                  <th>Sala</th>
                  <th>Ocupação</th>
                  <th>Alunos</th>
                </tr>
              </thead>
              <tbody>
                {salas.map((s) => (
                  <tr key={s.id}>
                    <td>
                      <strong>{s.codigo}</strong> {!s.ativa && <span className="selo selo--erro">interditada</span>}
                    </td>
                    <td>
                      {ocupacao(alocacao, s.id)}/{s.capacidade}
                    </td>
                    <td>
                      {alunos
                        .filter((a) => alocacao[a.id] === s.id)
                        .map((a) => a.nome)
                        .join(', ') || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ---------- Ajuste manual e publicação (só antes de publicar) ---------- */}
      {gerada && !publicada && (
        <section className="cartao">
          <h2>Ajuste manual</h2>
          <form onSubmit={mover} className="form-linha">
            <div className="campo">
              <label htmlFor="aluno">Aluno</label>
              <select id="aluno" value={alunoId} onChange={(e) => setAlunoId(e.target.value)}>
                {aptos.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.nome}
                  </option>
                ))}
              </select>
            </div>
            <div className="campo">
              <label htmlFor="destino">Mover para</label>
              <select id="destino" value={salaId} onChange={(e) => setSalaId(e.target.value)}>
                {ativas.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.codigo} – {ocupacao(alocacao, s.id)}/{s.capacidade}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="botao">
              Mover aluno
            </button>
          </form>
          {erroAjuste && <Aviso tipo="erro">{erroAjuste}</Aviso>}
        </section>
      )}

      {gerada && !publicada && (
        <section className="cartao">
          <h2>Publicar</h2>
          <p>Ao publicar, os alunos veem a sala em "Minha prova" e os professores recebem a lista da sala.</p>
          <button className="botao botao--primario" onClick={onPublicar}>
            Publicar distribuição
          </button>
        </section>
      )}

      {gerada && <Registro itens={edicao.registro} />}
    </>
  )
}
