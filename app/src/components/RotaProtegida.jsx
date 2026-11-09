import { Navigate } from 'react-router-dom'

// Só mostra a tela se o usuário entrou com o perfil certo.
// Caso contrário, volta para a tela de acesso.
export default function RotaProtegida({ usuario, perfil, children }) {
  if (!usuario || usuario.perfil !== perfil) {
    return <Navigate to="/" replace />
  }
  return children
}
