// Caixa de mensagem. tipo pode ser 'ok', 'erro' ou 'info'
const SIMBOLO = { ok: '✔', erro: '⚠', info: 'ℹ' }

export default function Aviso({ tipo, children }) {
  return (
    <div className={`aviso aviso--${tipo}`} role="status">
      <span className="aviso__simbolo">{SIMBOLO[tipo]}</span>
      <div>{children}</div>
    </div>
  )
}
