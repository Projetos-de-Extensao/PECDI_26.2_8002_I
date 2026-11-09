// Caixa de mensagem. tipo: 'ok', 'erro' ou 'info'
export default function Aviso({ tipo = 'info', children }) {
  const simbolo = { ok: '✔', erro: '⚠', info: 'ℹ' }[tipo]
  return (
    <div className={`aviso aviso--${tipo}`} role={tipo === 'erro' ? 'alert' : 'status'}>
      <span className="aviso__simbolo" aria-hidden="true">{simbolo}</span>
      <div>{children}</div>
    </div>
  )
}
