import { useCallback, useEffect, useState } from 'react'

const CLAVE = 'metrajes'

function cargarMetrajes() {
  try {
    const guardados = localStorage.getItem(CLAVE)
    if (!guardados) return []

    const parseados = JSON.parse(guardados)
    return Array.isArray(parseados) ? parseados : []
  } catch {
    return []
  }
}

export function useMetrajes() {
  const [metrajes, setMetrajes] = useState(cargarMetrajes)

  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(metrajes))
  }, [metrajes])

  const agregar = useCallback((item) => {
    setMetrajes((actuales) => [...actuales, item])
  }, [])

  const eliminar = useCallback((indice) => {
    setMetrajes((actuales) => actuales.filter((_, posicion) => posicion !== indice))
  }, [])

  return { metrajes, agregar, eliminar }
}
