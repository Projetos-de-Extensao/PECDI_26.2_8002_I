import { useState } from 'react'
import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import Registro from '../../components/Registro.jsx'
import { alunosDaSala, alunosSemSala, capacidadeTotal, ocupacao, salasAtivas } from '../../regras.js'

function AjusteManual({ aptos, salas, alocacao, onMover }) {
  const ativas = salasAtivas(salas)
  const [alunoId, setAlunoId] = useState(aptos[0]?.id ?? '')
  const [salaId, setSalaId] = useState(ativas[0]?.id ?? '')
  const [mensagem, setMensagem] = useState(null)

  function mover(e) {
    e.preventDefault()
    const aluno = aptos.find((a) => a.id === Number(alunoId))
    const sala = ativas.find((s) => s.id === Number(salaId))
    if (alocacao[aluno.id] === sala.id) {
      setMensagem({ tipo: 'erro', texto: `${aluno.nome} já está na sala ${sala.codigo}.` })
      return
    }
    if (ocupacao(alocacao, sala.id) >= sala.capacidade) {
      setMensagem({ tipo: 'erro', texto: `A sala ${sala.codigo} está cheia (${sala.capacidade}/${sala.capacidade}).` })
      return
    }
    onMover(aluno, sala)
    setMensagem({ tipo: 'ok', texto: `${aluno.nome} movido(a) para ${sala.codigo}.` })
  }

  return (
    <section className="cartao">
      <h2>Ajuste manual</h2>
      <form onSubmit={mover} className="form-linha">
        <div className="campo">
          <label htmlFor="aluno">Aluno</label>
          <select id="aluno" value={alunoId} onChange={(e) => setAlunoId(e.target.value)}>
            {aptos.map((a) => {
              const sala = salas.find((s) => s.id === alocacao[a.id])
              return (
                <option key={a.id} value={a.id}>
                  {a.nome} ({sala ? sala.codigo : 'sem sala'})
                </option>
              )
            })}
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
      {mensagem && <Aviso tipo={mensagem.tipo}>{mensagem.texto}</Aviso>}
    </section>
  )
}

export default function Distribuicao({
  salas,
  alunos,
  aptos,
  alunosCarregados,
  alocacao,
  gerada,
  publicada,
  registro,
  onGerar,
  onMover,
  onPublicar,
}) {
  const [confirmando, setConfirmando] = useState(false)

  if (!alunosCarregados) {
    return (
      <>
        <TituloPagina titulo="Distribuição" />
        <Aviso tipo="info">
          Importe a lista de alunos primeiro, em <Link to="/coordenacao/preparar">Preparar edição</Link>.
        </Aviso>
      </>
    )
  }

  const semSala = alunosSemSala(aptos, alocacao)
  const vazias = salasAtivas(salas).filter((s) => ocupacao(alocacao, s.id) === 0)
  const etapa = publicada ? 3 : gerada ? 2 : 1

  return (
    <>
      <TituloPagina titulo="Distribuição" subtitulo="Gerar, revisar e publicar a sala de cada aluno." />

      <ol className="passos" aria-label="Etapas da distribuição">
        {['Gerar', 'Revisar', 'Publicar'].map((nome, i) => (
          <li key={nome} className={i + 1 < etapa ? 'feito' : i + 1 === etapa ? 'atual' : ''} aria-current={i + 1 === etapa ? 'step' : undefined}>
            <span>{i + 1}</span> {nome}
          </li>
        ))}
      </ol>

      <div className="pilha">
        <section className="cartao">
          <h2>Resumo</h2>
          <p>
            <strong>{aptos.length}</strong> alunos aptos · <strong>{salasAtivas(salas).length}</strong> salas ·{' '}
            <strong>{capacidadeTotal(salas)}</strong> lugares
          </p>
          {publicada ? (
            <Aviso tipo="ok">
              Distribuição publicada. Mudanças agora são feitas em{' '}
              <Link to="/coordenacao/remanejamento">Remanejamento</Link>.
            </Aviso>
          ) : (
            <button type="button" className="botao botao--primario" onClick={onGerar}>
              {gerada ? 'Gerar de novo' : 'Gerar distribuição'}
            </button>
          )}
        </section>

        {gerada && (
          <section className="cartao">
            <h2>Revisão</h2>
            {semSala.length > 0 ? (
              <Aviso tipo="erro">Alunos sem sala: {semSala.map((a) => a.nome).join(', ')}.</Aviso>
            ) : (
              <Aviso tipo="ok">Todos os alunos aptos têm sala.</Aviso>
            )}
            {vazias.length > 0 && <Aviso tipo="info">Salas sem ocupação: {vazias.map((s) => s.codigo).join(', ')}.</Aviso>}

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
                        <div className="barra" aria-hidden="true">
                          <span style={{ width: `${(ocupacao(alocacao, s.id) / s.capacidade) * 100}%` }}></span>
                        </div>
                        {ocupacao(alocacao, s.id)}/{s.capacidade}
                      </td>
                      <td>
                        {alunosDaSala(alunos, alocacao, s.id)
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

        {gerada && !publicada && <AjusteManual aptos={aptos} salas={salas} alocacao={alocacao} onMover={onMover} />}

        {gerada && !publicada && (
          <section className="cartao">
            <h2>Publicar</h2>
            <p>Ao publicar, os alunos veem a sala em "Minha prova" e os professores recebem a lista da sala.</p>
            {!confirmando ? (
              <button type="button" className="botao botao--primario" onClick={() => setConfirmando(true)}>
                Publicar distribuição
              </button>
            ) : (
              <div className="confirmar">
                <p>
                  <strong>Confirmar publicação?</strong> {Object.keys(alocacao).length} alunos alocados
                  {semSala.length > 0 && `, ${semSala.length} sem sala`}.
                </p>
                <div className="acoes">
                  <button
                    type="button"
                    className="botao botao--primario"
                    onClick={() => {
                      onPublicar()
                      setConfirmando(false)
                    }}
                  >
                    Sim, publicar
                  </button>
                  <button type="button" className="botao" onClick={() => setConfirmando(false)}>
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {gerada && <Registro itens={registro} />}
      </div>
    </>
  )
}
