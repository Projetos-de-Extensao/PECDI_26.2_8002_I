import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import { alunosComPendencia, capacidadeTotal, formatarData, salasAtivas } from '../../regras.js'

function Numero({ valor, rotulo }) {
  return (
    <div className="numero">
      <span className="numero__valor">{valor}</span>
      <span className="numero__rotulo">{rotulo}</span>
    </div>
  )
}

export default function Painel({ config, salas, alunos, aptos, alunosCarregados, alocacao, gerada, publicada }) {
  const passos = [
    { feito: true, texto: 'Configurar data, horário e campus', link: '/coordenacao/preparar' },
    { feito: salasAtivas(salas).length > 0, texto: 'Conferir as salas disponíveis', link: '/coordenacao/preparar' },
    { feito: alunosCarregados, texto: 'Importar a lista de alunos', link: '/coordenacao/preparar' },
    { feito: gerada, texto: 'Gerar e revisar a distribuição', link: '/coordenacao/distribuicao' },
    { feito: publicada, texto: 'Publicar para alunos e professores', link: '/coordenacao/distribuicao' },
  ]
  const proximo = passos.find((p) => !p.feito)

  return (
    <>
      <TituloPagina
        titulo="Painel da edição"
        subtitulo={`Prova em ${formatarData(config.data)} às ${config.hora} · ${config.campus}`}
      />

      <div className="numeros">
        <Numero valor={alunosCarregados ? aptos.length : 0} rotulo="Alunos aptos" />
        <Numero valor={salasAtivas(salas).length} rotulo="Salas disponíveis" />
        <Numero valor={capacidadeTotal(salas)} rotulo="Lugares" />
        <Numero valor={Object.keys(alocacao).length} rotulo="Alunos alocados" />
        <Numero valor={alunosCarregados ? alunosComPendencia(alunos).length : 0} rotulo="Pendências de cadastro" />
      </div>

      <section className="cartao">
        <div className="linha linha--entre">
          <h2>Etapas da edição</h2>
          <span className={`selo ${publicada ? 'selo--ok' : 'selo--pendente'}`}>
            {publicada ? 'Publicada' : 'Em preparação'}
          </span>
        </div>
        <ol className="etapas">
          {passos.map((p) => (
            <li key={p.texto} className={p.feito ? 'etapa etapa--feita' : 'etapa'}>
              <span className="etapa__marca" aria-hidden="true">
                {p.feito ? '✔' : ''}
              </span>
              <span>{p.texto}</span>
              <span className="vh">{p.feito ? '(concluída)' : '(pendente)'}</span>
            </li>
          ))}
        </ol>
        {proximo && (
          <Link className="botao botao--primario" to={proximo.link}>
            Próximo passo: {proximo.texto.toLowerCase()}
          </Link>
        )}
      </section>
    </>
  )
}
