import { useState } from 'react'

export default function FormularioMetraje({ onGuardar, onEscoger }) {
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('')

  const manejarSubmit = (evento) => {
    evento.preventDefault()

    const nombreLimpio = nombre.trim()
    const tipoLimpio = tipo.trim()
    if (!nombreLimpio || !tipoLimpio) return

    onGuardar({ nombre, tipo });    
    setNombre('')
    setTipo('')
  }

  return (
    <form className="metraje" onSubmit={manejarSubmit}>
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        className="nombre"
        id="nombre"
        placeholder="Bullet Train"
        value={nombre}
        onChange={(evento) => setNombre(evento.target.value)}
        required
      />

      <label htmlFor="tipo">Tipo</label>
      <select
        name="tipo"
        id="tipo"
        className="tipo"
        value={tipo}
        onChange={(evento) => setTipo(evento.target.value)}
        required
      >
        <option value="" disabled>Selecciona un tipo de metraje...</option>
        <option value="Pelicula">Pelicula</option>
        <option value="Serie">Serie</option>
      </select>

      <div className="botones">
        <button type="submit" className="guardar">Guardar</button>
        <button type="button" className="escoger" onClick={onEscoger}>Escoger al azar</button>
      </div>
    </form>
  )
}
