export default function ListaMetrajes({ metrajes, onEliminar }) {
  return (
    <ul className="lista-pelis" id="lista-pelis">
      {metrajes.map((m) => (
        <li key={m._id}>
          {m.nombre} ({m.tipo})
          <button onClick={() => onEliminar(m._id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  )
}
