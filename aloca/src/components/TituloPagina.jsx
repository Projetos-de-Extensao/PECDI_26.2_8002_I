export default function TituloPagina({ titulo, subtitulo }) {
  return (
    <div className="titulo-pagina">
      <h1>{titulo}</h1>
      {subtitulo && <p className="subtitulo">{subtitulo}</p>}
    </div>
  )
}
