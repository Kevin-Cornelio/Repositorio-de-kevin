let listaRubros = JSON.parse(localStorage.getItem('rubros')) || [];
let listaProductos = JSON.parse(localStorage.getItem('productos')) || [];

const inputRubro = document.getElementById('rubroInput');
const selectRubro = document.getElementById('rubroSelect');
const inputNombre = document.getElementById('nombreInput');
const inputPrecio = document.getElementById('precioInput');
const inputStock = document.getElementById('stockInput');
const tablaProductos = document.getElementById('productoTableBody');

actualizarRubros();
actualizarProductos();

function agregarRubro() {
  const nuevoRubro = inputRubro.value.trim();
  if (!nuevoRubro) {
    alert('Por favor, ingrese un nombre de rubro válido.');
    return;
  }

  if (listaRubros.includes(nuevoRubro)) {
    alert('El rubro ya existe.');
  } else {
    listaRubros.push(nuevoRubro);
    localStorage.setItem('rubros', JSON.stringify(listaRubros));
    actualizarRubros();
  }

  limpiarCampos(inputRubro);
}

function actualizarRubros() {
  selectRubro.innerHTML = '';
  listaRubros.forEach(rubro => {
    const opcion = document.createElement('option');
    opcion.value = rubro;
    opcion.textContent = rubro;
    selectRubro.appendChild(opcion);
  });
}

function agregarProducto() {
  const nombreProducto = inputNombre.value.trim();
  const precioProducto = parseFloat(inputPrecio.value);
  const stockProducto = parseInt(inputStock.value);
  const rubroSeleccionado = selectRubro.value;

  if (!nombreProducto || isNaN(precioProducto) || isNaN(stockProducto) || !rubroSeleccionado) {
    alert("Todos los campos son obligatorios y deben contener valores válidos.");
    return;
  }

  const productoNuevo = { nombre: nombreProducto, precio: precioProducto, stock: stockProducto, rubro: rubroSeleccionado };
  listaProductos.push(productoNuevo);
  localStorage.setItem('productos', JSON.stringify(listaProductos));

  actualizarProductos();
  limpiarCampos(inputNombre, inputPrecio, inputStock);
}

function actualizarProductos() {
  tablaProductos.innerHTML = '';
  listaProductos.forEach((producto, indice) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toFixed(2)}</td>
      <td>${producto.stock}</td>
      <td>${producto.rubro}</td>
      <td>
        <button onclick="editarProducto(${indice})">Modificar</button>
        <button onclick="borrarProducto(${indice})">Eliminar</button>
      </td>
    `;
    tablaProductos.appendChild(fila);
  });
}

function borrarProducto(indice) {
  listaProductos.splice(indice, 1);
  localStorage.setItem('productos', JSON.stringify(listaProductos));
  actualizarProductos();
}

function editarProducto(indice) {
  const producto = listaProductos[indice];
  inputNombre.value = producto.nombre;
  inputPrecio.value = producto.precio;
  inputStock.value = producto.stock;
  selectRubro.value = producto.rubro;

  listaProductos.splice(indice, 1);
}


function limpiarCampos(...inputs) {
  inputs.forEach(input => input.value = '');
}
