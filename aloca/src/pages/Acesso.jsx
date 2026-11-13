import { useState } from 'react'
import Aviso from '../components/Aviso.jsx'

const PERFIS = [
  { valor: 'aluno', titulo: 'Aluno', descricao: 'Confirmar inscrição e consultar a sala da prova' },
  { valor: 'coordenacao', titulo: 'Coordenação', descricao: 'Preparar a edição, distribuir e publicar as salas' },
  { valor: 'professor', titulo: 'Professor', descricao: 'Fiscalizar a sala e marcar a presença dos alunos' },
]

export default function Acesso({ onEntrar }) {
  const [perfil, setPerfil] = useState('aluno')
  const [identificacao, setIdentificacao] = useState('')
  const [erro, setErro] = useState('')

  function enviar(e) {
    e.preventDefault()
    if (identificacao.trim() === '') {
      setErro('Informe sua matrícula ou e-mail institucional para entrar.')
    } else {
      onEntrar(perfil, identificacao.trim())
    }
  }

  return (
    <div className="acesso">
      <div className="acesso__texto">
        <h1>Alocação do Teste de Progresso</h1>
        <p className="subtitulo">
          Cada aluno com uma sala, cada sala com um professor fiscal, tudo publicado antes do dia da prova.
        </p>
      </div>

      <form className="cartao" onSubmit={enviar}>
        <h2>Entrar</h2>

        <fieldset className="perfis">
          <legend>Eu sou</legend>
          {PERFIS.map((p) => (
            <label key={p.valor} className={perfil === p.valor ? 'perfil-opcao perfil-opcao--ativa' : 'perfil-opcao'}>
              <input type="radio" checked={perfil === p.valor} onChange={() => setPerfil(p.valor)} value={p.valor} />
              <span>
                <strong>{p.titulo}</strong>
                <span className="suave">{p.descricao}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <div className="campo">
          <label htmlFor="identificacao">Matrícula ou e-mail institucional</label>
          <input
            id="identificacao"
            placeholder="ex.: 2026001"
            value={identificacao}
            onChange={(e) => setIdentificacao(e.target.value)}
          />
        </div>

        {erro && <Aviso tipo="erro">{erro}</Aviso>}

        <button type="submit" className="botao botao--primario botao--largo">
          Entrar
        </button>
        <p className="suave pequeno">Protótipo: qualquer identificação é aceita.</p>
      </form>
    </div>
  )
}
