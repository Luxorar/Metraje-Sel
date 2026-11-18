import { useEffect, useRef, useState } from 'react'

export default function ModalResultado({ elegido, onAceptar, onCerrar }) {
  const dialogRef = useRef(null)
  const desfaseRef = useRef({ x: 0, y: 0 })
  const [arrastrando, setArrastrando] = useState(false)

  useEffect(() => {
    const modal = dialogRef.current
    if (!modal) return

    if (elegido && !modal.open) {
      modal.style.margin = ''
      modal.style.left = ''
      modal.style.top = ''
      modal.showModal()
    } else if (!elegido && modal.open) {
      modal.close()
    }
  }, [elegido])

  useEffect(() => {
    if (!arrastrando) return

    const mover = (evento) => {
      const modal = dialogRef.current
      if (!modal) return

      let nuevaX = evento.clientX - desfaseRef.current.x
      let nuevaY = evento.clientY - desfaseRef.current.y

      const maxX = window.innerWidth - modal.offsetWidth
      const maxY = window.innerHeight - modal.offsetHeight
      nuevaX = Math.max(0, Math.min(nuevaX, maxX))
      nuevaY = Math.max(0, Math.min(nuevaY, maxY))

      modal.style.left = `${nuevaX}px`
      modal.style.top = `${nuevaY}px`
    }

    const soltar = () => setArrastrando(false)

    document.addEventListener('mousemove', mover)
    document.addEventListener('mouseup', soltar)

    return () => {
      document.removeEventListener('mousemove', mover)
      document.removeEventListener('mouseup', soltar)
    }
  }, [arrastrando])

  const empezarArrastre = (evento) => {
    if (evento.target.tagName === 'BUTTON') return

    const modal = dialogRef.current
    const rect = modal.getBoundingClientRect()
    const clicDentro =
      evento.clientX >= rect.left &&
      evento.clientX <= rect.right &&
      evento.clientY >= rect.top &&
      evento.clientY <= rect.bottom

    if (!clicDentro) return

    desfaseRef.current = {
      x: evento.clientX - rect.left,
      y: evento.clientY - rect.top,
    }

    modal.style.margin = '0'
    modal.style.left = `${rect.left}px`
    modal.style.top = `${rect.top}px`
    setArrastrando(true)
  }

  const cancelar = (evento) => {
    evento.preventDefault()
    onCerrar()
  }

  return (
    <dialog
      ref={dialogRef}
      className="escogido"
      id="modal-resultado"
      onMouseDown={empezarArrastre}
      onCancel={cancelar}
    >
      <p id="texto-escogido">{elegido ? `${elegido.nombre} (${elegido.tipo})` : ''}</p>
      <button type="button" id="aceptar-modal" onClick={onAceptar}>Aceptar</button>
      <button type="button" id="cerrar-modal" onClick={onCerrar}>Cerrar</button>
    </dialog>
  )
}
