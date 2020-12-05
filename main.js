const grilla = document.querySelector(".grilla");
const botonFacil = document.getElementById("facil");
const botonMedio = document.getElementById("medio");
const botonDificil = document.getElementById("dificil");
const reiniciarJuego = document.getElementById("reiniciar-juego");
const buscarMatches = document.getElementById("buscar-matches");
const contenedorBotonFacil = document.getElementById("contenedor-boton-facil");
const contenedorBotonMedio = document.getElementById("contenedor-boton-medio");
const contenedorBotonDificil = document.getElementById(
  "contenedor-boton-dificil"
);
const modalDificultad = document.querySelector("#modal-dificultades");

const cantidadDeImagenesDiferentes = 6;
const tamanioImg = 80;

const gatitosSeleccionados = document.querySelectorAll(".seleccionado");
let gatitoGuardadoEnClickAnterior = "";

//----------------------------- inicio sin bloques
const inicioSinBloquesFacil = () => {
  do {
    ocultarDificultades();
    vaciarGrilla();
    crearGrilla(9, 9);
    crearGrillaHtml(6);
    clickeable();
    tamanioFacil();
  } while (buscarBloqueInicial(6));
};

const inicioSinBloquesNormal = () => {
  do {
    ocultarDificultades();
    vaciarGrilla();
    crearGrilla(8, 8);
    crearGrillaHtml(8);
    clickeable();
  } while (buscarBloqueInicial(8));
};

const inicioSinBloquesDificil = () => {
  do {
    ocultarDificultades();
    vaciarGrilla();
    crearGrilla(7, 7);
    crearGrillaHtml(7);
    clickeable();
    tamanioDificil();
  } while (buscarBloqueInicial(10));
};

// ------------------ recorrer matches y colorearlos------------

let listaDivsVacios = [];
const recorrerDivVacios = () => {
  let hijosDeGrilla = grilla.children;
  for (let div of hijosDeGrilla) {
    if (div.lastElementChild) {
      // console.log(" hay ");
    }
    if (!div.lastElementChild) {
      // console.log(" NO hay ", div);
      listaDivsVacios.push(div);
    }
  }

  // insertarNuevosGatitos(listaDivsVacios);
};

const insertarNuevosGatitos = (listaDivsVacios) => {
  for (let k = 0; k < listaDivsVacios.length; k++) {
    let img = document.createElement("img");

    img.classList.add("imagen-gatito");
    listaDivsVacios[i].appendChild(img);
  }
};

const removerImagenDelDiv = (divGatito) => {
  console.log("remover de este div:", divGatito);

  if (divGatito.firstElementChild) {
    let imagen = divGatito.firstElementChild;
    divGatito.removeChild(imagen);
  }
};

/**
 * Después de encontrar los bloques, sacoa la img de los divs matcheados. REVISAR
 *
 */
const borrarMatches = () => {
  for (let i = 0; i < matchesHorizontales.length; i++) {
    // en cada pos tengo [i,j]
    removerImagenDelDiv(obtenerDivMatcheado(matchesHorizontales[i]));
  }
  for (let i = 0; i < matchesVerticales.length; i++) {
    removerImagenDelDiv(obtenerDivMatcheado(matchesVerticales[i]));
  }
  if (!matchesHorizontales.length && !matchesVerticales.length) {
    alert("No hay matches :(");
  }
  matchesHorizontales = [];
  matchesVerticales = [];
};
const botonProbandoVacios = document.querySelector("#boton-vacios");
botonProbandoVacios.onclick = () => {
  recorrerDivVacios();
};
// ---------------Obtener bloque de Matches

/**
 * Devuelve un div en la coordenadas dadas.
 * @param {array} indices - Posición x y de la celda
 */
const obtenerDivMatcheado = (arr) => {
  return document.querySelector(`div[data-x='${arr[0]}'][data-y='${arr[1]}']`);
};

// -------------------------BUSCAR BLOQUE INICIAL------------------
const buscarBloqueInicial = (maximo) => {
  maximo = maximo - 1;
  for (let i = 0; i < listaDeGatitos.length; i++) {
    for (let j = 0; j < listaDeGatitos[i].length; j++) {
      //  listaDeGatios[i][j] es la img
      let celdaActual = listaDeGatitos[i][j].src;
      // if (listaDeGatitos[i < maximo][j < maximo]) {
      if (
        listaDeGatitos[i + 1] &&
        listaDeGatitos[i + 2] &&
        listaDeGatitos[i + 1][j] <= listaDeGatitos[maximo][j]
      ) {
        let celdaHorizontalMasUno = listaDeGatitos[i][j + 1].src;
        let celdaHorizontalMasDos = listaDeGatitos[i][j + 2].src;
        let celdaVerticalMasUno = listaDeGatitos[i + 1][j].src;
        let celdaVerticalMasDos = listaDeGatitos[i + 2][j].src;
        if (
          celdaActual === celdaHorizontalMasUno &&
          celdaActual === celdaHorizontalMasDos
        ) {
          console.log("hay un match horizontal", listaDeGatitos[i][j]);
        }
        if (
          celdaActual === celdaVerticalMasUno &&
          celdaActual === celdaVerticalMasDos
        ) {
          console.log("hay un match vertical", listaDeGatitos[i][j]);
        }
      }
    }
  }
};

// ---------------------------INICIO BUSCARmatch BOTON------

let matchesHorizontales = [];
let matchesVerticales = [];

/**
 * Busca matches entre celda adyacentes,
 * los agrega a los arrays de matches horizontales y verticales en forma de array x y.
 */
const buscarBloque = () => {
  for (let i = 0; i < listaDeGatitos.length; i++) {
    for (let j = 0; j < listaDeGatitos[i].length; j++) {
      // for (let k = 0; k < listaDeGatitos[i][j].length; k++) {
      //   console.log(listaDeGatitos[i][j][k]);
      const celdaActual = listaDeGatitos[i][j];
      if (
        listaDeGatitos[i][j + 1] && // valido no irme de ancho.
        listaDeGatitos[i][j + 2] &&
        celdaActual === listaDeGatitos[i][j + 1] && // next derecha
        listaDeGatitos[i][j + 1] === listaDeGatitos[i][j + 2] // next derecha = a su adyacente derecha
      ) {
        matchesHorizontales.push([i, j]);
        matchesHorizontales.push([i, j + 1]);
        matchesHorizontales.push([i, j + 2]);
        console.log(matchesHorizontales);
      }
      if (
        listaDeGatitos[i + 1] && //
        listaDeGatitos[i + 2] && // Valida que exista la fila de abajo y la siguiente
        celdaActual === listaDeGatitos[i + 1][j] &&
        celdaActual === listaDeGatitos[i + 2][j]
      ) {
        matchesVerticales.push([i, j]);
        matchesVerticales.push([i + 1, j]);
        matchesVerticales.push([i + 2, j]);
      }
    }
  }
  // borrarMatches();
};
// };

// ---------------------------Crear  Img Gatito------------
/**
 * Devuelve un numero entero al azar entre 0 y la cantidad máxima de imagenes!
 */
const obtenerNumeroAlAzar = () => {
  return Math.floor(Math.random() * cantidadDeImagenesDiferentes);
};
/**
 * Devuelve un string random que se va a usar como src en los img.
 */
const obtenerSrcGatito = () => {
  return `img/Gatito-${obtenerNumeroAlAzar()}.png`;
};

const obtenerImgGatito = (i, j) => {
  let img = document.createElement("img");
  img.src = obtenerSrcGatito();
  img.dataset.x = i;
  img.dataset.y = j;
  img.dataset.id = `${i}${j}`;
  img.classList.add("imagen-gatito");
  return img;
};

//-------------------------------INICIO CREACION DE GRILLA JS Y HTML----------

let listaDeGatitos = []; // esta es la grilla que va a contener todas las IMGs

const crearDivGatito = (x, y) => {
  const divGatito = document.createElement("div");
  divGatito.addEventListener("click", escucharClicks);
  divGatito.dataset.x = x;
  divGatito.dataset.y = y;
  divGatito.dataset.id = `${x}${y}`;
  // let img = document.createElement("img");

  // img.src = listaDeGatitos[x][y];
  divGatito.appendChild(listaDeGatitos[x][y]);
  divGatito.style.top = `${x * tamanioImg}px`;
  divGatito.style.left = `${y * tamanioImg}px`;
  divGatito.className = "contenedor-gatito";

  return divGatito;
};

const crearGrilla = (ancho, alto) => {
  for (let i = 0; i < ancho; i++) {
    listaDeGatitos[i] = [];
    for (let j = 0; j < alto; j++) {
      listaDeGatitos[i][j] = obtenerImgGatito(i, j);
    }
  }
  return listaDeGatitos;
};
const crearGrillaHtml = (ancho) => {
  const anchoDeGrilla = tamanioImg * ancho;
  grilla.style.width = `${anchoDeGrilla}px`; // ancho de celda
  for (let i = 0; i < listaDeGatitos.length; i++) {
    for (let j = 0; j < listaDeGatitos[i].length; j++) {
      grilla.appendChild(crearDivGatito(i, j));
    }
  }

  return grilla;
};
// ------------------------------------------Efecto CLICKEABLE

const clickeable = () => {
  const imgsGatitoHtml = document.querySelectorAll(".imagen-gatito");

  for (let gatito of imgsGatitoHtml) {
    gatito.onclick = () => {
      gatito.classList.toggle("clickeable");
    };
  }
};
// ---------------------- INICIO INTERCAMBIAR CUADRADOS
const intercambiarCuadrados = (cuadrado1, cuadrado2) => {
  // console.log(cuadrado1, "este es el UNO");
  // console.log(cuadrado2, "Este es el dos");

  const datax1 = Number(cuadrado1.dataset.x);
  const datax2 = Number(cuadrado2.dataset.x);
  const datay1 = Number(cuadrado1.dataset.y);
  const datay2 = Number(cuadrado2.dataset.y);

  let variableTemporal = listaDeGatitos[datax1][datay1];
  listaDeGatitos[datax1][datay1] = listaDeGatitos[datax2][datay2];
  listaDeGatitos[datax2][datay2] = variableTemporal;

  console.log(variableTemporal);
  cuadrado1.style.top = `${datax2 * tamanioImg}px`;
  cuadrado2.style.top = `${datax1 * tamanioImg}px`;
  cuadrado1.style.left = `${datay2 * tamanioImg}px`;
  cuadrado2.style.left = `${datay1 * tamanioImg}px`;

  cuadrado1.dataset.x = datax2;
  cuadrado2.dataset.x = datax1;
  cuadrado1.dataset.y = datay2;
  cuadrado2.dataset.y = datay1;
};
// ---------------------------FIN INTERCAMBIAR CUADRADOS
// ---------------------------Inicio Escuchar Clicks-----------
const borrarSeleccion = (primerGato, segundoGato) => {
  primerGato.classList.remove("seleccionado");
  segundoGato.classList.remove("seleccionado");
};

const cruzarGatitos = (primerGato, segundoGato) => {
  //llamo a esta funcion cuando se seleccionaron adyancentes!
  // la uso para cruzar los gatitos despues
  gatitoGuardadoEnClickAnterior = "";
};

// VER SI STRING '' PARA ANTERIOR

const escucharClicks = (e) => {
  // console.log("primer gato clickeado: ", gatitoGuardadoEnClickAnterior);

  let gatitoClickeado = e.target; // CLICK

  if (gatitoClickeado.nodeName === "IMG") {
    gatitoClickeado = gatitoClickeado.parentElement;
  }

  if (!gatitoClickeado.className.includes("seleccionado")) {
    // console.log("gatitoclickeado", gatitoClickeado);
    gatitoClickeado.classList.add("seleccionado"); // si no está seleccionado lo selecciono.
    // console.log(gatitoGuardadoEnClickAnterior);
    if (
      gatitoGuardadoEnClickAnterior &&
      !esIgualAlPrimerGato(gatitoClickeado)
    ) {
      // valido si es igual al anteriormente seleccionado
      // console.log("No es igual al primero");

      borrarSeleccion(gatitoGuardadoEnClickAnterior, gatitoClickeado);

      if (sonAdyacentes(gatitoGuardadoEnClickAnterior, gatitoClickeado)) {
        // console.log("son Adyacentes!!!!!!!!!!!!!!!!!!!!!!!!!");
        intercambiarCuadrados(gatitoGuardadoEnClickAnterior, gatitoClickeado);
        cruzarGatitos(gatitoGuardadoEnClickAnterior, gatitoClickeado);
      } else {
        // no son adyacentes!!!
        gatitoGuardadoEnClickAnterior = gatitoClickeado;
        gatitoClickeado.classList.add("seleccionado"); // este lo dejo para cuando no son
        // adyacentes y sigo seleccionando
      }
    } else {
      gatitoGuardadoEnClickAnterior = gatitoClickeado;
    }
  }
};
const esIgualAlPrimerGato = (gato) => {
  if (gatitoGuardadoEnClickAnterior) {
    return gatitoGuardadoEnClickAnterior.dataset.id === gato.dataset.id;
  }
  return false;
};

// --------------INICIO SON ADYACENTES
const sonAdyacentes = (cuadradoUno, cuadradoDos) => {
  // console.log(cuadradoUno, "cuadradoUNO SonAdyacentes");
  // console.log(cuadradoDos, "cuadradoDOS SonAdyacentes");
  if (cuadradoUno) {
    let xCuadradoUno = cuadradoUno.dataset.x;
    let xCuadradoDos = cuadradoDos.dataset.x;
    xCuadradoUno = Number(xCuadradoUno);
    xCuadradoDos = Number(xCuadradoDos);

    let yCuadradoUno = cuadradoUno.dataset.y;
    let yCuadradoDos = cuadradoDos.dataset.y;
    yCuadradoUno = Number(yCuadradoUno);
    yCuadradoDos = Number(yCuadradoDos);

    if (xCuadradoUno == xCuadradoDos) {
      if (
        yCuadradoUno == yCuadradoDos + 1 ||
        yCuadradoUno == yCuadradoDos - 1
      ) {
        // console.log("Son adyacentes!", yCuadradoUno, yCuadradoDos);
        // console.log("Son adyacentes!");
        return true;
      }
    }
    if (yCuadradoUno == yCuadradoDos) {
      if (
        xCuadradoUno == xCuadradoDos + 1 ||
        xCuadradoUno == xCuadradoDos - 1
      ) {
        // console.log("Esto es true", yCuadradoUno, xCuadradoUno);
        // console.log("Son adyacentes!");
        return true;
      }
    }
  }
  // console.log("NO son adyacentes :(");
  return false;
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
// ------------------Inicio botones Dificultad on Click-------------
botonFacil.onclick = () => {
  inicioSinBloquesFacil();

  reiniciarJuego.classList.add("facil");
};

botonMedio.onclick = () => {
  inicioSinBloquesNormal();

  reiniciarJuego.classList.add("medio");
};

botonDificil.onclick = () => {
  inicioSinBloquesDificil();

  reiniciarJuego.classList.add("dificil");
};

reiniciarJuego.onclick = () => {
  clickeable();
  vaciarGrilla();
  if (reiniciarJuego.classList.contains("facil")) {
    inicioSinBloquesFacil();
  } else if (reiniciarJuego.classList.contains("medio")) {
    inicioSinBloquesNormal();
  } else if (reiniciarJuego.classList.contains("dificil")) {
    inicioSinBloquesDificil();
  }
};

// buscarMatches.onclick = () => {
//   buscarBloque();
//   // borrarMatches();
// };

/**************cuenta regresiva */
let tiempo = 30;
const tiempoHtml = document.getElementById("tiempo");
// console.log(tiempoHtml);
const cuentaRegresiva = () => {
  tiempoHtml.innerHTML = `0:${tiempo}`;
  if (tiempo <= 0) {
  } else {
    tiempo -= 1;
    setTimeout("cuentaRegresiva()", 1000);
  }
};

// ------------------------------------INICIO MODALES
const modalBienvenida = document.querySelector("#contenedor-modal-bienvenida");
const AJugar = document.getElementById("boton-jugar");
const botonCruz = document.querySelector(".delete");

const botonCerrarDificultad = document.querySelector("#cerrar-dificultad");

const ocultarBienvenida = () => {
  modalBienvenida.classList.add("ocultar");
};

const mostrarDificultades = () => {
  modalDificultad.classList.remove("is-hidden");
  modalDificultad.classList.add("is-active");
};
const ocultarDificultades = () => {
  modalDificultad.classList.add("is-hidden");
  modalDificultad.classList.remove("is-active");
};

AJugar.onclick = () => {
  ocultarBienvenida();
  mostrarDificultades();
};

// ------------------ remove Gatito

//----------------------------------------------------Tamaño de Divs e Img según dificultad-------------------------
const imgsGatito = document.querySelectorAll(".imagen-gatito");
const contenedoresGatito = document.querySelectorAll(".contenedor-gatito");

const tamanioNormal = () => {
  // console.log(imgsGatito);
  for (let contenedor of contenedoresGatito) {
    console.log(contenedor);
    contenedor.classList.add("div-modo-normal");
  }
  for (let img of imgsGatito) {
    img.classList.add("img-modo-normal");
  }
};

const tamanioFacil = () => {
  for (let contenedor of contenedoresGatito) {
    contenedor.classList.add("div-modo-facil");
  }
  for (let img of imgsGatito) {
    img.classList.add("img-modo-facil");
  }
};
const tamanioDificil = () => {
  for (let contenedor of contenedoresGatito) {
    contenedor.classList.add("div-modo-dificil");
  }
  for (let img of imgsGatito) {
    img.classList.add("img-modo-dificil");
  }
};
