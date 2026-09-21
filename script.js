/* 
Agregar elementos a la lista */
function agregarDato(item){
    const li = document.createElement('li');
    li.textContent = item.nombre + ' - ' + item.tipo;
    document.getElementById('lista-pelis').appendChild(li); /* Deja el elemento como hijo */
}

/*Evita que el fomrulario recargue la pagina y los datos se borren */
document.getElementById('form-metraje').addEventListener('submit', function(e){
    e.preventDefault(); 

    /*Agarrar las variables del formulario (nombre y tipo)*/    
    const nombre = document.getElementById('nombre').value.trim();
    const tipo = document.getElementById('tipo').value.trim();

    agregarDato({nombre,tipo});
    this.reset(); /* Limpiar formulario */
})

