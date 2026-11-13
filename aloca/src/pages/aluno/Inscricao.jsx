import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import { ALUNO_LOGADO } from '../../dados.js'
import { formatarData } from '../../regras.js'

export default function Inscricao({ dados, onInscrever }) {
  const { edicao, alunos } = dados
  const aluno = alunos.find((a) => a.id === ALUNO_LOGADO)

  return (
    <>
      <TituloPagina titulo={`Olá, ${aluno.nome}`} subtitulo="Confira seus dados e confirme a inscrição." />

      <div className="grade grade--2">
        <section className="cartao">
          <h2>Seus dados</h2>
          <div className="pessoa">
            <div className="foto">{aluno.nome[0]}</div>
            <dl className="dados">
              <dt>Nome</dt>
              <dd>{aluno.nome}</dd>
              <dt>Matrícula</dt>
              <dd>{aluno.matricula}</dd>
              <dt>Curso</dt>
              <dd>{aluno.curso}</dd>
            </dl>
          </div>
          <p className="suave pequeno">Algum dado errado? Procure a secretaria antes de confirmar.</p>
        </section>

        <section className="cartao">
          <h2>Inscrição</h2>
          <dl className="dados">
            <dt>Prova</dt>
            <dd>
              {formatarData(edicao.data)} às {edicao.hora}
            </dd>
            <dt>Local</dt>
            <dd>{edicao.campus}</dd>
            <dt>Situação</dt>
            <dd>
              {aluno.inscrito ? (
                <span className="selo selo--ok">Confirmada</span>
              ) : (
                <span className="selo selo--pendente">Pendente</span>
              )}
            </dd>
          </dl>

          {aluno.inscrito ? (
            <Aviso tipo="ok">
              Inscrição confirmada. A sala aparece em <Link to="/aluno/prova">Minha prova</Link> quando a coordenação
              publicar a distribuição.
            </Aviso>
          ) : (
            <button className="botao botao--primario" onClick={onInscrever}>
              Confirmar inscrição
            </button>
          )}
        </section>
      </div>
    </>
  )
}
