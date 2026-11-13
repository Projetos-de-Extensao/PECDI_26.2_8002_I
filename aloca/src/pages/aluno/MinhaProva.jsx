import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import Aviso from '../../components/Aviso.jsx'
import { ALUNO_LOGADO } from '../../dados.js'
import { formatarData } from '../../regras.js'

export default function MinhaProva({ dados }) {
  const { edicao, salas, alunos } = dados
  const aluno = alunos.find((a) => a.id === ALUNO_LOGADO)
  const sala = salas.find((s) => s.id === edicao.alocacao[aluno.id])
  const titulo = <TituloPagina titulo="Minha prova" subtitulo="Onde e quando você faz o Teste de Progresso." />

  // Situações em que ainda não há sala para mostrar
  if (!aluno.inscrito) {
    return (
      <>
        {titulo}
        <Aviso tipo="info">
          Você ainda não confirmou a inscrição. <Link to="/aluno/inscricao">Confirmar agora</Link>.
        </Aviso>
      </>
    )
  }
  if (!edicao.publicada) {
    return (
      <>
        {titulo}
        <Aviso tipo="info">A distribuição das salas ainda não foi publicada. Volte mais tarde.</Aviso>
      </>
    )
  }
  if (!sala) {
    return (
      <>
        {titulo}
        <Aviso tipo="erro">Você não foi alocado(a) a nenhuma sala. Procure a coordenação do seu curso.</Aviso>
      </>
    )
  }

  return (
    <>
      {titulo}
      {aluno.aviso && (
        <Aviso tipo="erro">
          <strong>Mudança de sala.</strong> {aluno.aviso}
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
            <dd>{formatarData(edicao.data)}</dd>
            <dt>Horário</dt>
            <dd>{edicao.hora} (chegue 30 minutos antes)</dd>
            <dt>Campus</dt>
            <dd>{edicao.campus}</dd>
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
            <div className="qr">QR</div>
            <p className="suave">
              Código de validação
              <br />
              <strong className="codigo">
                TP-{aluno.matricula}-{sala.codigo}
              </strong>
            </p>
          </div>
          <button className="botao botao-imprimir nao-imprimir" onClick={() => window.print()}>
            Imprimir ou salvar em PDF
          </button>
        </section>
      </div>
    </>
  )
}
