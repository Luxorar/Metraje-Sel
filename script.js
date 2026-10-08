const CLAVE = 'metrajes';
const lista = document.getElementById('lista-pelis');
const form = document.getElementById('form-metraje');

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
    li.textContent = `${item.nombre} - ${item.tipo} `;

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

/* Mostrar lo que ya estaba guardado al abrir la página */
renderizar();