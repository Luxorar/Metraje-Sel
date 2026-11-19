import { useState } from 'react'
import FormularioMetraje from './components/FormularioMetraje'
import ListaMetrajes from './components/ListaMetrajes'
import ModalResultado from './components/ModalResultado'
import { useMetrajes } from './hooks/useMetrajes'
import './App.css'

function App() {
  const { metrajes, agregar, eliminar } = useMetrajes()
  const [seleccion, setSeleccion] = useState(null)

  const escogerAlAzar = () => {
    if (metrajes.length === 0) {
      alert('Primero guarda al menos una película o serie.')
      return
    }

    const indiceAleatorio = Math.floor(Math.random() * metrajes.length)
    setSeleccion( metrajes[indiceAleatorio])
  }

  const aceptarSeleccion = () => {
    if (!seleccion) return

    eliminar(seleccion._id)
    setSeleccion(null)
  }

  return (
    <main>
      <h3>Selector de Serie o Película para ver</h3>

      <FormularioMetraje onGuardar={agregar} onEscoger={escogerAlAzar} />

      <ListaMetrajes metrajes={metrajes} onEliminar={eliminar} />

      <ModalResultado
        elegido={seleccion}
        onAceptar={aceptarSeleccion}
        onCerrar={() => setSeleccion(null)}
      />
    </main>
  )
}

export default App
