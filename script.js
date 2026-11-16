const CLAVE = 'metrajes';
let indiceEliminar = null;
const lista = document.getElementById('lista-pelis');
const form = document.getElementById('form-metraje');
const modal = document.getElementById('modal-resultado');
const textoEscogido = document.getElementById('texto-escogido');
const btnCerrarModal = document.getElementById('cerrar-modal');
const btnAceptar = document.getElementById('aceptar-modal')

/* Cargar lo guardado (o un array vacío si no hay nada) */
let metrajes = JSON.parse(localStorage.getItem(CLAVE)) || [];

/* Guardar el array en localStorage */
function guardar() {
  localStorage.setItem(CLAVE, JSON.stringify(metrajes));
}

/* Dibujar la lista completa a partir del array */
function renderizar() {
  lista.innerHTML = ''; // limpiar antes de redibujar

  metrajes.forEach((item, indice) => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} (${item.tipo}) `;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'Eliminar';
    btnEliminar.type = 'button';
    btnEliminar.addEventListener('click', () => eliminarDato(indice));

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

/* Agregar un item */
function agregarDato(item) {
  metrajes.push(item);
  guardar();
  renderizar();
}

/* Eliminar un item por su posición */
function eliminarDato(indice) {
  metrajes.splice(indice, 1);
  guardar();
  renderizar();
}

/* Manejar el envío del formulario */
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const tipo = document.getElementById('tipo').value.trim();

  agregarDato({ nombre, tipo });
  this.reset();
});

/* Botón para escoger serie o peli al azar */
document.querySelector('.escoger').addEventListener('click', () => {
  // 1. Verificamos directamente sobre el array 'metrajes'
  if (metrajes.length === 0) {
    alert('Primero guarda al menos una película o serie.');
    return;
  }

  // 2. Calculamos una posición aleatoria
  const indiceAleatorio = Math.floor(Math.random() * metrajes.length);
  const elegido = metrajes[indiceAleatorio];

  // 3. Mostramos el nombre y tipo limpios y centramos el modal antes de abrirlo
  textoEscogido.textContent = `${elegido.nombre} (${elegido.tipo})`;
  modal.style.margin = '';
  modal.style.left = '';
  modal.style.top = '';
  modal.showModal();

  indiceEliminar = elegido.indice;
});

/* Cerrar el modal solo con el botón */
btnCerrarModal.addEventListener('click', () => {
  modal.close();
});

/* Cerrar el modal con el boton y ademas quitar de la lista al elemento seleccioando */
btnAceptar.addEventListener('click', ()=>{
  eliminarDato(indiceEliminar);
  modal.close();
})

/* === HACER EL MODAL ARRASTRABLE === */
let arrastrando = false;
let desfaseX = 0;
let desfaseY = 0;

// 1. Al presionar el clic sobre el modal
modal.addEventListener('mousedown', (e) => {
  // Evita arrastrar si se hace clic en el botón "Cerrar"
  if (e.target.tagName === 'BUTTON') return;

  // Obtenemos las coordenadas exactas de la caja visible del modal
  const rect = modal.getBoundingClientRect();

  // Verificamos si el clic ocurrió DENTRO de la caja (y no en el fondo oscuro)
  const clicDentro =
    e.clientX >= rect.left &&
    e.clientX <= rect.right &&
    e.clientY >= rect.top &&
    e.clientY <= rect.bottom;

  if (!clicDentro) return;

  arrastrando = true;
  desfaseX = e.clientX - rect.left;
  desfaseY = e.clientY - rect.top;

  // Quitamos el centrado automático del navegador para poder moverlo con left/top
  modal.style.margin = '0';
  modal.style.left = `${rect.left}px`;
  modal.style.top = `${rect.top}px`;
});

// 2. Al mover el mouse por toda la ventana
document.addEventListener('mousemove', (e) => {
  if (!arrastrando) return;

  // Calculamos la nueva posición restando el desfase inicial
  let nuevaX = e.clientX - desfaseX;
  let nuevaY = e.clientY - desfaseY;

  // Evita que el modal se salga fuera de los bordes de la pantalla
  const maxX = window.innerWidth - modal.offsetWidth;
  const maxY = window.innerHeight - modal.offsetHeight;
  nuevaX = Math.max(0, Math.min(nuevaX, maxX));
  nuevaY = Math.max(0, Math.min(nuevaY, maxY));

  modal.style.left = `${nuevaX}px`;
  modal.style.top = `${nuevaY}px`;
});

// 3. Al soltar el clic en cualquier parte
document.addEventListener('mouseup', () => {
  arrastrando = false;
});

/* Mostrar lo que ya estaba guardado al abrir la página */
renderizar();