import { useCallback, useEffect, useRef, useState } from 'react'
import { listarMetrajes, agregarMetraje, eliminarMetraje } from '../api/metrajes'

const INTERVALO_SINCRONIZACION = 4000

export function useMetrajes() {
  const [metrajes, setMetrajes] = useState([])
  const [estado, setEstado] = useState('cargando')
  const controlRef = useRef(null)

  const cargar = useCallback(async () => {
    // Cancelar la lectura anterior para que una respuesta lenta no sobrescriba la más reciente.
    controlRef.current?.abort()
    const control = new AbortController()
    controlRef.current = control

    try {
      const datos = await listarMetrajes(control.signal)
      setMetrajes(datos)
      setEstado('ok')
    } catch (err) {
      if (err.name === 'AbortError') return
      setEstado('error')
      console.error(err)
    }
  }, [])

  useEffect(() => {
    // Diferir la carga al siguiente microtask: es sincronización con un sistema
    // externo (la API), no un setState sincrónico dentro del effect.
    Promise.resolve().then(cargar)
  }, [cargar])

  useEffect(() => {
    const temporizador = setInterval(cargar, INTERVALO_SINCRONIZACION)
    const alEnfocar = () => cargar()
    const alCambiarVisibilidad = () => {
      if (document.visibilityState === 'visible') cargar()
    }

    window.addEventListener('focus', alEnfocar)
    document.addEventListener('visibilitychange', alCambiarVisibilidad)

    return () => {
      clearInterval(temporizador)
      window.removeEventListener('focus', alEnfocar)
      document.removeEventListener('visibilitychange', alCambiarVisibilidad)
    }
  }, [cargar])

  useEffect(() => () => controlRef.current?.abort(), [])

  const agregar = async (datos) => {
    try {
      const nuevo = await agregarMetraje(datos)
      // Invalidar cualquier lectura en curso para no perder el metraje recién creado.
      controlRef.current?.abort()
      setMetrajes((actual) => [nuevo, ...actual])
    } catch (err) {
      console.error(err)
      alert('No se pudo guardar.')
    }
  }

  const eliminar = async (id) => {
    try {
      await eliminarMetraje(id)
      controlRef.current?.abort()
      setMetrajes((actual) => actual.filter((m) => m._id !== id))
    } catch (err) {
      console.error(err)
      alert('No se pudo eliminar.')
    }
  }

  return { metrajes, agregar, eliminar, estado, recargar: cargar }
}
