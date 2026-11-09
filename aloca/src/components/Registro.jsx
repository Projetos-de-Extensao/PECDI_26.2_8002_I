// Histórico de alterações da distribuição
export default function Registro({ itens }) {
  return (
    <section className="cartao">
      <h2>Registro de alterações</h2>
      {itens.length === 0 ? (
        <p className="suave">Nenhuma alteração ainda.</p>
      ) : (
        <ul className="registro">
          {itens.map((linha, i) => (
            <li key={i}>{linha}</li>
          ))}
        </ul>
      )}
    </section>
  )
}
