const API = import.meta.env.VITE_API_URL ?? ''

export async function listarMetrajes(signal) {
  const res = await fetch(`${API}/api/metrajes`, { signal })
  if (!res.ok) throw new Error('Error al listar')
  return res.json()
}

export async function agregarMetraje(datos) {
  const res = await fetch(`${API}/api/metrajes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  })
  if (!res.ok) throw new Error('Error al agregar')
  return res.json()
}

export async function eliminarMetraje(id) {
  const res = await fetch(`${API}/api/metrajes/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar')
}
