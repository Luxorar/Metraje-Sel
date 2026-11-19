import { useEffect, useState } from 'react';

export function useMetrajes() {
  const [metrajes, setMetrajes] = useState([]);

  useEffect(() => {
    fetch('/api/metrajes').then(r => r.json()).then(setMetrajes).catch(console.error);
  }, []);

  const agregar = async (item) => {
    console.log('Enviando:', item);
    const r = await fetch('/api/metrajes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    const data = await r.json();
    if (!r.ok) {
      console.error('Error de la API:', data.error);
      return;
    }
    setMetrajes((prev) => [...prev, data]);
  };

  const eliminar = async (id) => {
    await fetch(`/api/metrajes/${id}`, { method: 'DELETE' });
    setMetrajes(prev => prev.filter(m => m._id !== id));
  };

  return { metrajes, agregar, eliminar };
}