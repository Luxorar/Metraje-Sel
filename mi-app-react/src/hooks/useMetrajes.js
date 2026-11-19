import { useEffect, useState } from 'react'
import { listarMetrajes, agregarMetraje, eliminarMetraje } from '../api/metrajes'

export function useMetrajes() {
  const [metrajes, setMetrajes] = useState([])

  useEffect(() => {
    listarMetrajes().then(setMetrajes).catch(console.error)
  }, [])

  const agregar = async (datos) => {
    try {
      const nuevo = await agregarMetraje(datos)
      setMetrajes((actual) => [nuevo, ...actual])
    } catch (err) {
      console.error(err)
      alert('No se pudo guardar.')
    }
  }

  const eliminar = async (id) => {
    try {
      await eliminarMetraje(id)
      setMetrajes((actual) => actual.filter((m) => m._id !== id))
    } catch (err) {
      console.error(err)
      alert('No se pudo eliminar.')
    }
  }

  return { metrajes, agregar, eliminar }
}