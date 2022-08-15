const listMusic = [
  {
    title: 'Another Love',
    file: 'AnotherLove.mp3',
    cover: '1.jpeg'
  },
  {
    title: 'Atlantis',
    file: 'Atlantis.mp3',
    cover: '3.jpeg'
  },
  {
    title: 'Interestellar',
    file: 'Interstellar.mp3',
    cover: '2.jpeg'
  }
]
// Cancion actual.
let cancionActual = null

// Capturar elementos del DOM.
const canciones = document.getElementById('canciones')
const audio = document.getElementById('audio')
const imagen = document.getElementById('imagen')
const titulo = document.getElementById('titulo')
const play = document.getElementById('play')
const anterior = document.getElementById('prev')
const siguiente = document.getElementById('next')
const progreso = document.getElementById('progreso')
const progresoContenedor = document.getElementById('contenedor-progreso')

// Actualizar barra de progreso.
progresoContenedor.addEventListener('click', actualizarProgresoContenedor)

// Escuchar elemento AUDIO.
audio.addEventListener('timeupdate', actualizarProgreso)

// Escuchar clicks en el boton play.
play.addEventListener('click', () => audio.paused ? reproducirCancion() : pausarCancion())

// Escuchar clicks de anterior y siguiente.
anterior.addEventListener('click', () => anteriorCancion())
siguiente.addEventListener('click', () => siguienteCancion())

// Cargar canciones y listado.
function cargarCanciones() {
  listMusic.forEach((cancion, index) => {
    // Crear li
    const li = document.createElement('li');
    // Crear a
    const link = document.createElement('a');
    // Hidratar a
    link.innerText = cancion.title;
    link.href = '#'
    // Escuchar clicks.
    link.addEventListener('click', () => cargarCancion(index))
    // Añadir a a li
    li.appendChild(link);
    // Añadir li a ul
    canciones.appendChild(li);
  })
}

// Cargar cancion seleccionada.
function cargarCancion(cancionIndex) {
  if (cancionActual !== cancionIndex) {
    cambiarClaseActiva(cancionActual, cancionIndex)
    cancionActual = cancionIndex
    audio.src = "./musica/" + listMusic[cancionIndex].file
    reproducirCancion()
    cambiarCover(cancionIndex)
    cambiarTitulo(cancionIndex)
    //audio.play()
  }
}
// Cambiar conver de la cancion.
function cambiarCover(cancionIndex) {
  imagen.src = "./imagenes/" + listMusic[cancionIndex].cover
}

// Cambiar el titulo de la cancion.
function cambiarTitulo(cancionIndex) {
  titulo.innerText = listMusic[cancionIndex].title
}

// Cambiar clase activa.
function cambiarClaseActiva(ultimaCancion, nuevaCancion) {
  const links = document.querySelectorAll('a')
  if (ultimaCancion !== null) {
    links[ultimaCancion].classList.remove('active')
  }
  links[nuevaCancion].classList.add('active')
}

// Actualizar controles.
function actualizarControl() {
  if (audio.paused) {
    play.innerText = 'pausar'
  } else {
    play.innerText = 'escuchando'
  }
}

// Pausar cancion
function pausarCancion() {
  audio.pause()
  actualizarControl()
}
// Reproducir cancion.
function reproducirCancion() {
  if (cancionActual !== null) {
    audio.play()
    actualizarControl()
  }
}

// Siguiente cancion.
function siguienteCancion() {
  if (cancionActual < listMusic.length - 1) {
    cargarCancion(cancionActual + 1)
  } else {
    cargarCancion(0)
  }
}
// Anterior cancion.
function anteriorCancion() {
  if (cancionActual > 0) {
    cargarCancion(cancionActual - 1)
  } else {
    cargarCancion(listMusic.length - 1)
  }
}

// Actualizar progreso.
function actualizarProgreso(event) {
  // Obtenemos la duracion de la cancion, y el segundo actual en el cual se encuentra la cancion.
  const { duration, currentTime } = event.srcElement
  const porcentaje = (currentTime / duration) * 100
  progreso.style.width = porcentaje + "%"
}

// Hacer la barra de progreso clickleable.
function actualizarProgresoContenedor(event) {
  const totalWidth = this.offsetWidth
  const progressWidth = event.offsetX
  const current = (progressWidth / totalWidth) * audio.duration
  audio.currentTime = current
}

// Lanzar siguiente canción cuando se acaba la actual
audio.addEventListener("ended", () => siguienteCancion())

// Ejectuar
cargarCanciones()