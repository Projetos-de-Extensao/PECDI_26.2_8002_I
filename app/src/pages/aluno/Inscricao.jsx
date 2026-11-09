import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import { formatarData } from '../../regras.js'

export default function Inscricao({ aluno, config, inscrito, onInscrever }) {
  return (
    <>
      <TituloPagina
        titulo={`Olá, ${aluno.nome.split(' ')[0]}`}
        subtitulo="Confira seus dados e confirme a inscrição no Teste de Progresso."
      />

      <div className="grade grade--2">
        <section className="cartao">
          <h2>Seus dados</h2>
          <div className="pessoa">
            <div className="foto" aria-hidden="true">
              {aluno.nome
                .split(' ')
                .map((parte) => parte[0])
                .join('')}
            </div>
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
              {formatarData(config.data)} às {config.hora}
            </dd>
            <dt>Local</dt>
            <dd>{config.campus}</dd>
            <dt>Situação</dt>
            <dd>
              <span className={`selo ${inscrito ? 'selo--ok' : 'selo--pendente'}`}>
                {inscrito ? 'Confirmada' : 'Pendente'}
              </span>
            </dd>
          </dl>

          {inscrito ? (
            <Aviso tipo="ok">
              Inscrição confirmada. A sala aparece em <Link to="/aluno/prova">Minha prova</Link> assim que a
              coordenação publicar a distribuição.
            </Aviso>
          ) : (
            <button type="button" className="botao botao--primario" onClick={onInscrever}>
              Confirmar inscrição
            </button>
          )}
        </section>
      </div>
    </>
  )
}
