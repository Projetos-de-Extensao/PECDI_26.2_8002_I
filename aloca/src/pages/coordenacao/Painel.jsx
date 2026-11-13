import { Link } from 'react-router-dom'
import TituloPagina from '../../components/TituloPagina.jsx'
import { ALUNO_LOGADO } from '../../dados.js'
import { alunosAptos, formatarData, salasAtivas } from '../../regras.js'

export default function Painel({ dados }) {
  const { edicao, salas, alunos } = dados
  const ativas = salasAtivas(salas)
  const lugares = ativas.reduce((total, s) => total + s.capacidade, 0)
  const pendencias = alunos.filter((a) => a.pendencia).length
  const aptos = alunosAptos(alunos, alunos.find((a) => a.id === ALUNO_LOGADO).inscrito)

  const numeros = [
    { valor: edicao.alunosCarregados ? aptos.length : 0, rotulo: 'Alunos aptos' },
    { valor: ativas.length, rotulo: 'Salas disponíveis' },
    { valor: lugares, rotulo: 'Lugares' },
    { valor: Object.keys(edicao.alocacao).length, rotulo: 'Alunos alocados' },
    { valor: edicao.alunosCarregados ? pendencias : 0, rotulo: 'Pendências de cadastro' },
  ]

  const etapas = [
    { feita: true, texto: 'Configurar data, horário e campus', link: '/coordenacao/preparar' },
    { feita: ativas.length > 0, texto: 'Conferir as salas disponíveis', link: '/coordenacao/preparar' },
    { feita: edicao.alunosCarregados, texto: 'Importar a lista de alunos', link: '/coordenacao/preparar' },
    { feita: edicao.gerada, texto: 'Gerar e revisar a distribuição', link: '/coordenacao/distribuicao' },
    { feita: edicao.publicada, texto: 'Publicar para alunos e professores', link: '/coordenacao/distribuicao' },
  ]
  const proxima = etapas.find((e) => !e.feita)

  return (
    <>
      <TituloPagina
        titulo="Painel da edição"
        subtitulo={`Prova em ${formatarData(edicao.data)} às ${edicao.hora} · ${edicao.campus}`}
      />

      <div className="numeros">
        {numeros.map((n) => (
          <div className="numero" key={n.rotulo}>
            <span className="numero__valor">{n.valor}</span>
            <span className="numero__rotulo">{n.rotulo}</span>
          </div>
        ))}
      </div>

      <section className="cartao">
        <h2>Etapas da edição</h2>
        <ol className="etapas">
          {etapas.map((e) => (
            <li key={e.texto} className={e.feita ? 'etapa etapa--feita' : 'etapa'}>
              <span className="etapa__marca">{e.feita ? '✔' : ''}</span>
              <span>{e.texto}</span>
            </li>
          ))}
        </ol>
        {proxima && (
          <Link className="botao botao--primario" to={proxima.link}>
            Próximo passo: {proxima.texto.toLowerCase()}
          </Link>
        )}
      </section>
    </>
  )
}
