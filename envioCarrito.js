//variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articuloCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
  //Cuando Agregas un curso presionando Agregar Al Carrito
  listaCursos.addEventListener("click", agregarCurso);
  //Eliminar cursos del carrito agregando desde query selector
  carrito.addEventListener("click", eliminarCurso);
  //Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    //resetar el carrito
    articuloCarrito = [];
    limpiarHTML();
  });
}

// Funciones

function agregarCurso(e) {
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//funcion eliminar un curso del carrito
function eliminarCurso(e) {
  // console.log(e.target.classList);
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    //eleminar desde el arreglo articuloCarrito  por el data-id
    articuloCarrito = articuloCarrito.filter((curso) => curso.id !== cursoId);
    carritoHtml();
  }
}

// lee lo que tiene el Html y extrae la informacion del curso
function leerDatosCurso(curso) {
  // console.log(curso);

  //crear arreglo de curso del curso actual seleccionado

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector("p span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisa si el curso ya exite en carrito
  const existe = articuloCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    //actualizar la cantidad
    const cursos = articuloCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articuloCarrito = [...cursos];
  } else {
    //agregamos el curso al carrito
    articuloCarrito = [...articuloCarrito, infoCurso];
  }

  // agregar elementos al arreglo de agregar al carrito

  carritoHtml(); //iterar sobre el carrito y mostrar el html
}

//muestra los articulos en el html

function carritoHtml() {
  //limpiar el html
  limpiarHTML();

  // recorre el carrito y genera el html
  articuloCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    console.log(curso);
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
    <img src="${imagen}" width="100"> 
    </td>
    <td>
    ${titulo}
    </td>
     <td>
    ${precio}
    </td>
     <td>
    ${cantidad}
    </td>
    <td>
    <a href="#" class="borrar-curso" data-id="${id}">X</a>
    </td>
    `;

    //agregar el html del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}
// ELIMINA los cursos del tbody

function limpiarHTML() {
  //forma lenta
  // contenedorCarrito.innerHTML = "";

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
