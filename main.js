//  ----------------------------------------ESTO SIRVE----------------------------------
// const creadorImg = () => {
//   var img = document.createElement("img");
//   img.src = `img/Gatito-1.png`;
//   document.body.appendChild(img);
// };
// creadorImg();

const grilla = document.querySelector(".grilla");
const botonFacil = document.getElementById("facil");
const botonMedio = document.getElementById("medio");
const botonDificil = document.getElementById("dificil");
const nuevoJuego = document.getElementById("nuevo-juego");
const reiniciarJuego = document.getElementById("reiniciar-juego");
const buscarMatches = document.getElementById("buscar-matches");

//  ----------------------------------------ESTO SIRVE----------------------------------
const crearGatitos = () => {
  let contador = 0;
  while (contador < 6) {
    contador++;
    let img = document.createElement("img");
    img.src = `img/Gatito-${contador}.png`;
    document.body.appendChild(img);
  }
};

// ----------------------------------------------------------------------------
//--------------------------------------------------- esto es sirve

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
    let img = document.createElement("img");
    img.src = `img/Gatito-${i}.png`;
    // contenedor.appendChild(img);
    array[i] = img;
  }
  return array;
};
//---------------------------------------------------------------------------------------
// console.log(crearArrayGatitos());

//-----------------------------------------
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

const crearGrilla = (ancho, alto) => {
  const anchoDeGrilla = 80 * ancho;
  grilla.style.width = `${anchoDeGrilla}px`;

  for (let i = 0; i < ancho; i++) {
    listaDeGatitos[i] = [];
    for (let j = 0; j < alto; j++) {
      listaDeGatitos[i][j] = obtenerGatitoAlAzar(items);
    }
  }

  grilla.innerHTML = "";

  for (let i = 0; i < listaDeGatitos.length; i++) {
    for (let j = 0; j < listaDeGatitos[i].length; j++) {
      gatitos = obtenerGatitoAlAzar(items);
      listaDeGatitos[i][j] = gatitos;

      grilla.innerHTML += `<div class="contenedor-gatito" data-x="${i}" data-y="${j}"></div>`;

      let contenedores = document.querySelectorAll(".contenedor-gatito");

      for (contenedor of contenedores) {
        contenedor.appendChild(gatitos);
      }
    }
  }

  return grilla;
};

const ocultarBotones = () => {
  botonFacil.classList.add("ocultar");
  botonMedio.classList.add("ocultar");
  botonDificil.classList.add("ocultar");
};

botonFacil.onclick = () => {
  crearGrilla(6, 6);
  ocultarBotones();
  reiniciarJuego.classList.add("facil");
};

botonMedio.onclick = () => {
  crearGrilla(8, 8);
  ocultarBotones();
  reiniciarJuego.classList.add("medio");
};

botonDificil.onclick = () => {
  crearGrilla(10, 10);
  ocultarBotones();
  reiniciarJuego.classList.add("dificil");
};

nuevoJuego.onclick = () => {
  botonFacil.classList.toggle("ocultar");
  botonMedio.classList.toggle("ocultar");
  botonDificil.classList.toggle("ocultar");
  reiniciarJuego.classList.remove("facil");
  reiniciarJuego.classList.remove("medio");
  reiniciarJuego.classList.remove("dificil");
};

reiniciarJuego.onclick = () => {
  if (reiniciarJuego.classList.contains("facil")) {
    crearGrilla(6, 6);
  } else if (reiniciarJuego.classList.contains("medio")) {
    crearGrilla(8, 8);
  } else if (reiniciarJuego.classList.contains("dificil")) {
    crearGrilla(10, 10);
  }
};

buscarMatches.onclick = () => {
  for (let i = 0; i < listaDeGatitos.length; i++) {
    for (let j = 0; j < listaDeGatitos[i].length; j++) {
      if (
        listaDeGatitos[i][j] === listaDeGatitos[i][j + 1] &&
        listaDeGatitos[i][j + 1] === listaDeGatitos[i][j + 2]
      ) {
        const div = document.querySelector(`div[data-x="${i}"][data-y="${j}"]`);
        div.style.backgroundColor = "yellow";
        const divDos = document.querySelector(
          `div[data-x="${i}"][data-y="${j + 1}"]`
        );
        sonAdyacentes(div, divDos);
        divDos.style.backgroundColor = "yellow";
        const divTres = document.querySelector(
          `div[data-x="${i}"][data-y="${j + 2}"]`
        );
        divTres.style.backgroundColor = "yellow";
      }
    }
  }
  for (let i = 0; i < listaDeGatitos.length; i++) {
    for (let j = 0; j < listaDeGatitos[i].length; j++) {
      if (
        listaDeGatitos[i + 1] &&
        listaDeGatitos[i + 2] &&
        listaDeGatitos[i][j] === listaDeGatitos[i + 1][j] &&
        listaDeGatitos[i][j] === listaDeGatitos[i + 2][j]
      ) {
        const uno = document.querySelector(`div[data-x="${i}"][data-y="${j}"]`);
        uno.style.backgroundColor = "red";
        const dos = document.querySelector(
          `div[data-x="${i + 1}"][data-y="${j}"]`
        );
        dos.style.backgroundColor = "red";
        sonAdyacentes(uno, dos);
        const tres = document.querySelector(
          `div[data-x="${i + 2}"][data-y="${j}"]`
        );
        tres.style.backgroundColor = "red";
      }
    }
  }
};
