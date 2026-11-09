import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import { formatarData } from '../../regras.js'

export default function MinhaProva({ aluno, config, salas, alocacao, inscrito, publicada, aviso }) {
  const sala = salas.find((s) => s.id === alocacao[aluno.id])

  // Cada situação mostra uma mensagem diferente
  let bloqueio = null
  if (!inscrito) {
    bloqueio = (
      <Aviso tipo="info">
        Você ainda não confirmou a inscrição. <Link to="/aluno/inscricao">Confirmar agora</Link>.
      </Aviso>
    )
  } else if (!publicada) {
    bloqueio = <Aviso tipo="info">A distribuição das salas ainda não foi publicada. Volte mais tarde.</Aviso>
  } else if (!sala) {
    bloqueio = <Aviso tipo="erro">Você não foi alocado(a) a nenhuma sala. Procure a coordenação do seu curso.</Aviso>
  }

  return (
    <>
      <TituloPagina titulo="Minha prova" subtitulo="Onde e quando você faz o Teste de Progresso." />

      {bloqueio}

      {!bloqueio && (
        <>
          {aviso && (
            <Aviso tipo="erro">
              <strong>Mudança de sala.</strong> {aviso}
            </Aviso>
          )}

          <div className="grade grade--2">
            <section className="cartao">
              <h2>Local da prova</h2>
              <p className="sala-destaque">
                Sala <strong>{sala.codigo}</strong>
              </p>
              <dl className="dados">
                <dt>Data</dt>
                <dd>{formatarData(config.data)}</dd>
                <dt>Horário</dt>
                <dd>{config.hora} (chegue 30 minutos antes)</dd>
                <dt>Campus</dt>
                <dd>{config.campus}</dd>
                <dt>Prédio</dt>
                <dd>{sala.predio}</dd>
              </dl>
            </section>

            <section className="cartao comprovante">
              <h2>Comprovante</h2>
              <p>
                <strong>{aluno.nome}</strong>
                <br />
                Matrícula {aluno.matricula}
              </p>
              <div className="linha">
                <div className="qr" aria-hidden="true">
                  QR
                </div>
                <p className="suave">
                  Código de validação
                  <br />
                  <strong className="codigo">
                    TP-{aluno.matricula}-{sala.codigo}
                  </strong>
                </p>
              </div>
              <button type="button" className="botao botao-imprimir nao-imprimir" onClick={() => window.print()}>
                Imprimir ou salvar em PDF
              </button>
            </section>
          </div>
        </>
      )}
    </>
  )
}
