import { useState } from 'react'
import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import Registro from '../../components/Registro.jsx'
import { ocupacao, salasAtivas } from '../../regras.js'

export default function Remanejamento({ salas, alocacao, publicada, registro, onRemanejar }) {
  const ativas = salasAtivas(salas)
  const ocupadas = ativas.filter((s) => ocupacao(alocacao, s.id) > 0)
  const interditadas = salas.filter((s) => !s.ativa)

  const [origemId, setOrigemId] = useState(ocupadas[0]?.id ?? '')
  const [destinoId, setDestinoId] = useState(ativas[1]?.id ?? ativas[0]?.id ?? '')
  const [mensagem, setMensagem] = useState(null)

  if (!publicada) {
    return (
      <>
        <TituloPagina titulo="Remanejamento" />
        <Aviso tipo="info">
          O remanejamento só fica disponível depois de <Link to="/coordenacao/distribuicao">publicar a distribuição</Link>.
        </Aviso>
      </>
    )
  }

  function confirmar(e) {
    e.preventDefault()
    const origem = salas.find((s) => s.id === Number(origemId))
    const destino = salas.find((s) => s.id === Number(destinoId))
    if (!origem || !destino) return
    if (origem.id === destino.id) {
      setMensagem({ tipo: 'erro', texto: 'Escolha uma sala de contingência diferente da sala com problema.' })
      return
    }
    const quantidade = ocupacao(alocacao, origem.id)
    const livres = destino.capacidade - ocupacao(alocacao, destino.id)
    if (quantidade > livres) {
      setMensagem({
        tipo: 'erro',
        texto: `A sala ${destino.codigo} tem ${livres} vaga(s), mas ${quantidade} aluno(s) precisam sair da ${origem.codigo}. Escolha outra sala ou cadastre uma nova.`,
      })
      return
    }
    onRemanejar(origem, destino, quantidade)
    setMensagem({ tipo: 'ok', texto: `Remanejamento concluído. Alunos e professores já veem a sala ${destino.codigo}.` })
    setOrigemId('')
  }

  return (
    <>
      <TituloPagina
        titulo="Remanejamento"
        subtitulo="Para imprevistos depois da publicação: a sala com problema é interditada e os alunos mudam juntos."
      />

      <div className="pilha">
        {interditadas.length > 0 && (
          <Aviso tipo="erro">Salas interditadas: {interditadas.map((s) => s.codigo).join(', ')}.</Aviso>
        )}

        <section className="cartao">
          <h2>Mover uma sala inteira</h2>
          {ocupadas.length === 0 ? (
            <p className="suave">Nenhuma sala ocupada para remanejar.</p>
          ) : (
            <form onSubmit={confirmar} className="form-linha">
              <div className="campo">
                <label htmlFor="origem">Sala com problema</label>
                <select id="origem" value={origemId} onChange={(e) => setOrigemId(e.target.value)}>
                  <option value="" disabled>
                    Escolha a sala
                  </option>
                  {ocupadas.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.codigo} – {ocupacao(alocacao, s.id)} alunos
                    </option>
                  ))}
                </select>
              </div>
              <div className="campo">
                <label htmlFor="contingencia">Sala de contingência</label>
                <select id="contingencia" value={destinoId} onChange={(e) => setDestinoId(e.target.value)}>
                  {ativas.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.codigo} – {ocupacao(alocacao, s.id)}/{s.capacidade}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="botao botao--perigo" disabled={!origemId}>
                Interditar e remanejar
              </button>
            </form>
          )}
          {mensagem && <Aviso tipo={mensagem.tipo}>{mensagem.texto}</Aviso>}
        </section>

        <Registro itens={registro} />
      </div>
    </>
  )
}
