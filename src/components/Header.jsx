import { Link, NavLink } from 'react-router-dom'
import { INICIO } from '../dados.js'

// Nome que aparece embaixo da marca
const NOME_PERFIL = {
  acesso: 'Sistema de alocação',
  aluno: 'Aluno',
  coordenacao: 'Coordenação acadêmica',
  professor: 'Professor · fiscal de sala',
}

// Itens do menu de cada perfil
const MENU = {
  aluno: [
    { para: '/aluno/inscricao', texto: 'Inscrição' },
    { para: '/aluno/prova', texto: 'Minha prova' },
  ],
  coordenacao: [
    { para: '/coordenacao/painel', texto: 'Painel' },
    { para: '/coordenacao/preparar', texto: 'Preparar edição' },
    { para: '/coordenacao/distribuicao', texto: 'Distribuição' },
    { para: '/coordenacao/remanejamento', texto: 'Remanejamento' },
    { para: '/coordenacao/listas', texto: 'Listas' },
  ],
  professor: [{ para: '/professor/sala', texto: 'Minha sala' }],
}

// Props: perfil (aluno, coordenacao, professor ou acesso), identificacao e onSair
export default function Header({ perfil, identificacao, onSair }) {
  const itens = MENU[perfil] || []

  return (
    <header className="topo">
      <div className="topo__interno">
        <Link className="marca" to={INICIO[perfil]}>
          <span className="marca__selo" aria-hidden="true"></span>
          <span>
            Teste de Progresso
            <span className="marca__perfil">{NOME_PERFIL[perfil]}</span>
          </span>
        </Link>

        {itens.length > 0 && (
          <nav aria-label="Menu principal">
            <ul>
              {itens.map((item) => (
                // NavLink marca sozinho a página atual com aria-current="page"
                <li key={item.para}>
                  <NavLink to={item.para}>{item.texto}</NavLink>
                </li>
              ))}
              <li>
                <button type="button" className="sair" onClick={onSair}>
                  Sair{identificacao ? ` (${identificacao})` : ''}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
