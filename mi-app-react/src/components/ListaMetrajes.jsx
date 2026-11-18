export default function ListaMetrajes({ metrajes, onEliminar }) {
  return (
    <ul className="lista-pelis" id="lista-pelis">
      {metrajes.map((item, indice) => (
        <li key={`${item.nombre}-${item.tipo}-${indice}`}>
          {`${item.nombre} (${item.tipo}) `}
          <button type="button" onClick={() => onEliminar(indice)}>Eliminar</button>
        </li>
      ))}
    </ul>
  )
}
