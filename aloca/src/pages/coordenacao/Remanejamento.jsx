import { useState } from 'react'
import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import Registro from '../../components/Registro.jsx'
import { ocupacao, salasAtivas } from '../../regras.js'

export default function Remanejamento({ dados, onRemanejar }) {
  const { edicao, salas } = dados
  const ativas = salasAtivas(salas)
  const ocupadas = ativas.filter((s) => ocupacao(edicao.alocacao, s.id) > 0)

  const [origemId, setOrigemId] = useState('')
  const [destinoId, setDestinoId] = useState('')
  const [erro, setErro] = useState('')

  function confirmar(e) {
    e.preventDefault()
    const origem = salas.find((s) => s.id === origemId)
    const destino = salas.find((s) => s.id === destinoId)

    if (!origem || !destino) {
      setErro('Escolha a sala com problema e a sala de contingência.')
    } else if (origem.id === destino.id) {
      setErro('A sala de contingência precisa ser diferente da sala com problema.')
    } else if (ocupacao(edicao.alocacao, origem.id) > destino.capacidade - ocupacao(edicao.alocacao, destino.id)) {
      setErro(`A sala ${destino.codigo} não tem vagas para todos os alunos da ${origem.codigo}.`)
    } else {
      onRemanejar(origem, destino)
      setOrigemId('')
      setDestinoId('')
      setErro('')
    }
  }

  if (!edicao.publicada) {
    return (
      <>
        <TituloPagina titulo="Remanejamento" />
        <Aviso tipo="info">
          O remanejamento só fica disponível depois de <Link to="/coordenacao/distribuicao">publicar a distribuição</Link>.
        </Aviso>
      </>
    )
  }

  const interditadas = salas.filter((s) => !s.ativa)

  return (
    <>
      <TituloPagina
        titulo="Remanejamento"
        subtitulo="Para imprevistos depois da publicação: a sala com problema é interditada e os alunos mudam juntos."
      />

      {interditadas.length > 0 && (
        <Aviso tipo="erro">Salas interditadas: {interditadas.map((s) => s.codigo).join(', ')}.</Aviso>
      )}

      <section className="cartao">
        <h2>Mover uma sala inteira</h2>
        <form onSubmit={confirmar} className="form-linha">
          <div className="campo">
            <label htmlFor="origem">Sala com problema</label>
            <select id="origem" value={origemId} onChange={(e) => setOrigemId(e.target.value)}>
              <option value="">Escolha</option>
              {ocupadas.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.codigo} – {ocupacao(edicao.alocacao, s.id)} alunos
                </option>
              ))}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="contingencia">Sala de contingência</label>
            <select id="contingencia" value={destinoId} onChange={(e) => setDestinoId(e.target.value)}>
              <option value="">Escolha</option>
              {ativas.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.codigo} – {ocupacao(edicao.alocacao, s.id)}/{s.capacidade}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="botao botao--perigo">
            Interditar e remanejar
          </button>
        </form>
        {erro && <Aviso tipo="erro">{erro}</Aviso>}
      </section>

      <Registro itens={edicao.registro} />
    </>
  )
}
