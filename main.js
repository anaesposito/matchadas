const grilla = document.querySelector(".grilla");
const botonFacil = document.getElementById("facil");
const botonMedio = document.getElementById("medio");
const botonDificil = document.getElementById("dificil");
// const nuevoJuego = document.getElementById("nuevo-juego");
const reiniciarJuego = document.getElementById("reiniciar-juego");
const buscarMatches = document.getElementById("buscar-matches");
const contenedorBotonFacil = document.getElementById("contenedor-boton-facil");
const contenedorBotonMedio = document.getElementById("contenedor-boton-medio");
const contenedorBotonDificil = document.getElementById(
  "contenedor-boton-dificil"
);

//----------------------------- inicio sin bloques
const inicioSinBloquesFacil = () => {
  do {
    ocultarSeleccionDificultad();
    vaciarGrilla();
    crearGrilla(6, 6);
    crearGrillaHtml();
    clickeable();
    cuentaRegresiva()
  } while (buscarBloqueInicial());
};

const inicioSinBloquesMedio = () => {
  do {
    ocultarSeleccionDificultad();
    vaciarGrilla();
    crearGrilla(8, 8);
    crearGrillaHtml();
    clickeable();
  } while (buscarBloqueInicial());
};

const inicioSinBloquesDificil = () => {
  do {
    ocultarSeleccionDificultad();
    vaciarGrilla();
    crearGrilla(10, 10);
    crearGrillaHtml();
    clickeable();
  } while (buscarBloqueInicial());
};

// ------------------ recorrer matches y colorearlos------------
const colorearMatches = () => {
  for (let i = 0; i < matchesHorizontales.length; i++) {
    obtenerBloqueDeMatches(matchesHorizontales[i]).style.backgroundColor =
      "yellow";
  }
  for (let i = 0; i < matchesVerticales.length; i++) {
    obtenerBloqueDeMatches(matchesVerticales[i]).style.backgroundColor =
      "orange";
  }
  if (!matchesHorizontales.length && !matchesVerticales.length) {
    alert("No hay matches :(");
  }
};
// ---------------------------INICIO BUSCAR BLOQUES AL CARGAR
const buscarBloques = () => {
  for (let i = 0; i < listaDeGatitos.length; i++) {
    for (let j = 0; j < listaDeGatitos[i].length; j++) {
      if (
        listaDeGatitos[i][j] === listaDeGatitos[i][j + 1] &&
        listaDeGatitos[i][j + 1] === listaDeGatitos[i][j + 2]
      ) {
        matchesHorizontales.push([i, j]);
        matchesHorizontales.push([i, j + 1]);
        matchesHorizontales.push([i, j + 2]);
      }
      if (
        listaDeGatitos[i + 1] &&
        listaDeGatitos[i + 2] &&
        listaDeGatitos[i][j] === listaDeGatitos[i + 1][j] &&
        listaDeGatitos[i][j] === listaDeGatitos[i + 2][j]
      ) {
        matchesVerticales.push([i, j]);
        matchesVerticales.push([i + 1, j]);
        matchesVerticales.push([i + 2, j]);
      }
    }
  }
  colorearMatches();
};

// -------------------------BUSCAR BLOQUE INICIAL------------------

const buscarBloqueInicial = () => {
  for (let i = 0; i < listaDeGatitos.length; i++) {
    for (let j = 0; j < listaDeGatitos[i].length; j++) {
      if (
        listaDeGatitos[i][j] === listaDeGatitos[i][j + 1] &&
        listaDeGatitos[i][j + 1] === listaDeGatitos[i][j + 2]
      ) {
        return true;
      }
      if (
        listaDeGatitos[i + 1] &&
        listaDeGatitos[i + 2] &&
        listaDeGatitos[i][j] === listaDeGatitos[i + 1][j] &&
        listaDeGatitos[i][j] === listaDeGatitos[i + 2][j]
      ) {
        return true;
      }
    }
  }
  return false;
};

// --------------INICIO SON ADYACENTES
const sonAdyacentes = (cuadrado1, cuadrado2) => {
  let nroXCuadradoUno = cuadrado1.dataset.x;
  let nroXCuadradoDos = cuadrado2.dataset.x;
  nroXCuadradoUno = Number(nroXCuadradoUno);
  nroXCuadradoDos = Number(nroXCuadradoDos);

  let nroYCuadradoUno = cuadrado1.dataset.y;
  let nroYCuadradoDos = cuadrado2.dataset.y;
  nroYCuadradoUno = Number(nroYCuadradoUno);
  nroYCuadradoDos = Number(nroYCuadradoDos);

  if (nroXCuadradoUno == nroXCuadradoDos) {
    if (
      nroYCuadradoUno == nroYCuadradoDos + 1 ||
      nroYCuadradoUno == nroYCuadradoDos - 1
    ) {
      console.log("Esto es true", nroYCuadradoUno, nroYCuadradoDos);
      // return true;
    }
  }
  if (nroYCuadradoUno == nroYCuadradoDos) {
    if (
      nroXCuadradoUno == nroXCuadradoDos + 1 ||
      nroXCuadradoUno == nroXCuadradoDos - 1
    ) {
      console.log("Esto es true", nroYCuadradoUno, nroXCuadradoUno);
      // return true;
    }
  }
  console.log("Esto es false");
  // return false;
};
///////////////////////////////////////////////////

const crearArrayGatitos = () => {
  let array = [];

  for (let i = 0; i <= 5; i++) {
    array[i] = `img/Gatito-${i}.png`;
  }
  return array;
};
//---------------------------------------------------------------------------------------

// ---------------------------------------------CLICKEABLE

const clickeable = () => {
  const imgsGatitoHtml = document.querySelectorAll(".imagen-gatito");

  for (let gatito of imgsGatitoHtml) {
    gatito.onclick = () => {
      gatito.classList.toggle("clickeable");
    };
  }
};

//-----------------------------------------
let tamanio = 60;
let items = crearArrayGatitos();

let listaDeGatitos = [];

let gatitos = "";

const obtenerNumeroAlAzar = (items) => {
  let largo = items.length;
  return Math.floor(Math.random() * largo);
};
const obtenerGatitoAlAzar = (items) => {
  return items[obtenerNumeroAlAzar(items)];
};
const crearDivGatito = (x, y) => {
  const divGatito = document.createElement("div");
  divGatito.dataset.x = x;
  divGatito.dataset.y = y;

  let img = document.createElement("img");
  img.src = listaDeGatitos[x][y];
  img.classList.add("imagen-gatito");

  divGatito.appendChild(img);

  divGatito.style.top = `${x * tamanio}px`;
  divGatito.style.left = `${y * tamanio}px`;
  divGatito.className = "contenedor-gatito";
  return divGatito;
};

const crearGrilla = (ancho, alto) => {
  const anchoDeGrilla = 60 * ancho;
  grilla.style.width = `${anchoDeGrilla}px`;

  for (let i = 0; i < ancho; i++) {
    listaDeGatitos[i] = [];
    for (let j = 0; j < alto; j++) {
      listaDeGatitos[i][j] = obtenerGatitoAlAzar(items);
    }
  }
  return listaDeGatitos;
};
const crearGrillaHtml = () => {
  for (let i = 0; i < listaDeGatitos.length; i++) {
    for (let j = 0; j < listaDeGatitos[i].length; j++) {
      gatitos = obtenerGatitoAlAzar(items);
      listaDeGatitos[i][j] = gatitos;
      grilla.appendChild(crearDivGatito(i, j));
    }
  }

  return grilla;
};

// ---------------Obtener bloque de Matches
const obtenerBloqueDeMatches = (arr) => {
  return document.querySelector(`div[data-x='${arr[0]}'][data-y='${arr[1]}']`);
};

const ocultarBotones = () => {
  botonFacil.classList.add("ocultar");
  botonMedio.classList.add("ocultar");
  botonDificil.classList.add("ocultar");
};

const vaciarGrilla = () => {
  grilla.innerHTML = "";
  matchesHorizontales = [];
  matchesVerticales = [];
};

botonFacil.onclick = () => {
  inicioSinBloquesFacil();

  // ocultarSeleccionDificultad();
  // vaciarGrilla();
  // crearGrilla(6, 6);
  // crearGrillaHtml();
  // ocultarBotones();
  reiniciarJuego.classList.add("facil");
  // clickeable();
};

botonMedio.onclick = () => {
  inicioSinBloquesMedio();
  // ocultarSeleccionDificultad();
  // vaciarGrilla();
  // crearGrilla(8, 8);
  // crearGrillaHtml();
  // ocultarBotones();
  reiniciarJuego.classList.add("medio");
  // clickeable();
};

botonDificil.onclick = () => {
  inicioSinBloquesDificil();
  // ocultarSeleccionDificultad();
  // vaciarGrilla();
  // crearGrilla(10, 10);
  // crearGrillaHtml();
  // ocultarBotones();
  reiniciarJuego.classList.add("dificil");
  // clickeable();
};

// AJugar.onclick = () => {
//   vaciarGrilla();
//   contenedorBotonFacil.classList.toggle("ocultar");
//   contenedorBotonMedio.classList.toggle("ocultar");
//   contenedorBotonDificil.classList.toggle("ocultar");
//   reiniciarJuego.classList.remove("facil");
//   reiniciarJuego.classList.remove("medio");
//   reiniciarJuego.classList.remove("dificil");
// };

reiniciarJuego.onclick = () => {
  clickeable();
  vaciarGrilla();
  if (reiniciarJuego.classList.contains("facil")) {
    inicioSinBloquesFacil();
  } else if (reiniciarJuego.classList.contains("medio")) {
    inicioSinBloquesMedio();
  } else if (reiniciarJuego.classList.contains("dificil")) {
    inicioSinBloquesDificil();
  }
};
let matchesHorizontales = [];
let matchesVerticales = [];

buscarMatches.onclick = () => {
  buscarBloques();
};

/**************cuenta regresiva */
let tiempo = 30;
const tiempoHtml = document.getElementById("tiempo");
console.log(tiempoHtml);
const cuentaRegresiva = () => {
  tiempoHtml.innerHTML = `0:${tiempo}`;
  if (tiempo >= 0) {
    tiempo--
    setTimeout("cuentaRegresiva()", 1000);
  } else {
    alert("termino el juego")
    //aca deberia ir la funcion que abre el modal de juego terminado
  }
};

// ------------------------------------INICIO MODALES
const modalBienvenida = document.querySelector("#contenedor-modal-bienvenida");
const AJugar = document.getElementById("boton-jugar");
const botonCruz = document.querySelector(".delete");
const modalDificultad = document.querySelector("#contenedor-modal-dificultad");
const botonCerrarDificultad = document.querySelector("#cerrar-dificultad");

const ocultarBienvenida = () => {
  modalBienvenida.classList.add("ocultar");
};

const ocultarSeleccionDificultad = () => {
  modalDificultad.classList.add("ocultar");
};

AJugar.onclick = () => {
  ocultarBienvenida();
};

// botonCerrarDificultad.onclick = () => {
//   ocultarSeleccionDificultad();
// };

// ------------------------------------FIN MODALES
