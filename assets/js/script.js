'use strict';



/**
 * element toggle function
 */

const toggleElem = function (elem) { elem.classList.toggle("active"); }



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

for (let i = 0; i < navTogglers.length; i++) {
  navTogglers[i].addEventListener("click", function () {
    toggleElem(navbar);
    toggleElem(overlay);
  });
}



/**
 * header sticky & back to top button
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    header.classList.add("header-anim");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
    header.classList.remove("header-anim");
  }
});



/**
 * search box toggle
 */

const searchTogglers = document.querySelectorAll("[data-search-toggler]");
const searchBox = document.querySelector("[data-search-box]");

for (let i = 0; i < searchTogglers.length; i++) {
  searchTogglers[i].addEventListener("click", function () {
    toggleElem(searchBox);
  });
}



/**
 * whishlist button toggle
 */

const whishlistBtns = document.querySelectorAll("[data-whish-btn]");

for (let i = 0; i < whishlistBtns.length; i++) {
  whishlistBtns[i].addEventListener("click", function () {
    toggleElem(this);
  });
}















// Variables globales
let carritoItems = [];

// Cargar carrito de `localStorage` al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const savedCart = JSON.parse(localStorage.getItem('carrito'));
  if (savedCart) {
    carritoItems = savedCart;
    carritoItems.forEach(insertarCarrito);
  }
  actualizarTotalCarrito();
  actualizarContadorCarrito();
});

// Mostrar/Ocultar carrito
document.getElementById('mostrar-carrito').addEventListener('click', function () {
  const cartDropdown = document.getElementById('cart-dropdown');
  cartDropdown.classList.toggle('active');
});

// Actualizar el contador del carrito
function actualizarContadorCarrito() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = carritoItems.length;
}

// Función para actualizar el precio total del carrito
function actualizarTotalCarrito() {
  let total = 0;
  const filas = document.querySelectorAll('#lista-carrito tbody tr');
  filas.forEach(fila => {
    const precioElemento = fila.querySelector('td:nth-child(3)').textContent;
    if (precioElemento !== 'Gratis') {
      const precio = parseFloat(precioElemento.replace('$', '').trim()) || 0;
      total += precio;
    }
  });
  document.getElementById('total-precio').textContent = `Total: $${total.toFixed(2)}`;
  // Guardar el total en el localStorage
  localStorage.setItem('carritoTotal', total.toFixed(2));
}




// Guardar carrito en `localStorage`
function actualizarLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carritoItems));
}

// Evento al agregar un elemento al carrito
function comprarElemento(e) {
  e.preventDefault();
  const target = e.target;
  if (target.classList.contains('add-to-cart-btn')) {
    if (target.hasAttribute('data-course-id')) {
      const elemento = target.closest('.course-card');
      leerDatosCurso(elemento);
    } else if (target.hasAttribute('data-plan-name')) {
      const planNombre = target.getAttribute('data-plan-name');
      const planPrecio = target.getAttribute('data-plan-price');
      leerDatosPlan(planNombre, planPrecio);
    }
  }
}

function leerDatosCurso(elemento) {
  const precioElemento = elemento.querySelector('.card-price .span').textContent.trim();
  const precio = precioElemento === 'Gratis' ? 0 : parseFloat(precioElemento.replace('$', ''));

  const infoElemento = {
    imagen: elemento.querySelector('.card-banner img') 
      ? elemento.querySelector('.card-banner img').getAttribute('src') 
      : '', 
    titulo: elemento.querySelector('h3').textContent,
    precio: precio,
    id: elemento.querySelector('button').getAttribute('data-course-id')
  };

  carritoItems.push(infoElemento);
  insertarCarrito(infoElemento);
  actualizarTotalCarrito();
  actualizarContadorCarrito();
  actualizarLocalStorage();
}


function leerDatosPlan(nombre, precio) {
  const infoElemento = {
    imagen: '',
    titulo: nombre,
    precio: parseFloat(precio),
    id: nombre
  };
  carritoItems.push(infoElemento);
  insertarCarrito(infoElemento);
  actualizarTotalCarrito();
  actualizarContadorCarrito();
  actualizarLocalStorage();
}

function insertarCarrito(elemento) {
  const row = document.createElement('tr');
  const precioAMostrar = elemento.precio === 0 ? 'Gratis' : `$${elemento.precio.toFixed(2)}`;

  row.innerHTML = `
    <td><img src="${elemento.imagen}" width="50"></td>
    <td>${elemento.titulo}</td>
    <td>${precioAMostrar}</td>
    <td><button href="#" class="borrar" data-id="${elemento.id}">Eliminar</button></td>
  `;
  document.querySelector('#lista-carrito tbody').appendChild(row);
}

// Eliminar elemento del carrito
function eliminarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains('borrar')) {
    const elementoId = e.target.getAttribute('data-id');
    carritoItems = carritoItems.filter(item => item.id !== elementoId);
    e.target.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    actualizarContadorCarrito();
    actualizarLocalStorage();
  }
  
}

// Vaciar carrito
function vaciarCarrito() {
  const lista = document.querySelector('#lista-carrito tbody');
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild);
  }
  carritoItems = [];
  actualizarTotalCarrito();
  actualizarContadorCarrito();
  actualizarLocalStorage();
}

// Event Listeners
cargarEventListeners();

function cargarEventListeners() {
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', comprarElemento);
  });
  document.querySelector('#lista-carrito').addEventListener('click', eliminarElemento);
  document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
}


function insertarCarritoPago(elemento) {
  const orderItemsContainer = document.getElementById('order-items-container');
  const precioAMostrar = elemento.precio === 0 ? 'Gratis' : `$${elemento.precio.toFixed(2)}`;

  const orderItem = document.createElement('div');
  orderItem.classList.add('order-item');

  orderItem.innerHTML = `
    <img src="${elemento.imagen}" alt="Producto">
    <span class="item-name">${elemento.titulo}</span>
    <span class="item-price">${precioAMostrar}</span>
    <button class="borrar-pago" data-id="${elemento.id}">Eliminar</button>
  `;

  orderItemsContainer.appendChild(orderItem);
}


function eliminarElemento(e) {
  e.preventDefault();
  if (e.target.classList.contains('borrar')) {
    const elementoId = e.target.getAttribute('data-id');
    carritoItems = carritoItems.filter(item => item.id !== elementoId);
    e.target.parentElement.parentElement.remove();
    actualizarTotalCarrito();
    actualizarLocalStorage();
  }
}











// FUNCION PARA MOSTRAR EL MODAL YAPE
function showYape() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContainer = document.getElementById('modal-container');

  

  // Mostrar el modal con fondo translúcido
  modalOverlay.classList.remove('hidden');
  modalOverlay.classList.add('show');

  // Limpiar contenido previo
  modalContainer.innerHTML = '';

  // Cargar el contenido del archivo externo para Yape
  fetch('../front-end/PRUEBAPAGO/YAPE/yape.html')
      .then(response => response.text())
      .then(data => {
          modalContainer.innerHTML = data;

          // Cargar estilos y scripts específicos de Yape
          attachCSSAndJSYape();

          // Inicializar acciones específicas para Yape
          initializeYapeActions();
      })
      .catch(error => console.error('Error al cargar el contenido Yape:', error));
}

// FUNCION PARA MOSTRAR EL MODAL PLIN
function showPlin() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContainer = document.getElementById('modal-container');

    
  // Mostrar el modal con fondo translúcido
  modalOverlay.classList.remove('hidden');
  modalOverlay.classList.add('show');

  // Limpiar contenido previo
  modalContainer.innerHTML = '';

  // Cargar el contenido del archivo externo para Plin
  fetch('../front-end/PRUEBAPAGO/PLIN/plin.html')
      .then(response => response.text())
      .then(data => {
          modalContainer.innerHTML = data;

          // Cargar estilos y scripts específicos de Plin
          attachCSSAndJSPlin();

          // Inicializar acciones específicas para Plin
          initializePlinActions();
      })
      .catch(error => console.error('Error al cargar el contenido Plin:', error));
}

// Función para cargar estilos y scripts específicos para Yape
function attachCSSAndJSYape() {
  const cssPath = '../front-end/PRUEBAPAGO/YAPE/pagoyape.css';
  const jsPath = '../front-end/PRUEBAPAGO/YAPE/pagoyape.js';

  if (!document.querySelector(`link[href="${cssPath}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      document.head.appendChild(link);
  }

  const script = document.createElement('script');
  script.src = jsPath;
  document.body.appendChild(script);
}

// Inicializar acciones específicas para Yape
function initializeYapeActions() {
  const closeButton = document.querySelector('.btn-close-yape');
  const continueButton = document.querySelector('.btn-continue-yape');

  if (closeButton) {
      closeButton.addEventListener('click', closeModal);
  }

  if (continueButton) {
      continueButton.addEventListener('click', () => {
          console.log('Número de celular ingresado correctamente en Yape');
      });
  }
}

// Función para cargar estilos y scripts específicos para Plin
function attachCSSAndJSPlin() {
  const cssPath = '../front-end/PRUEBAPAGO/PLIN/pagoplin.css';
  const jsPath = '../front-end/PRUEBAPAGO/PLIN/pagoplin.js';

  if (!document.querySelector(`link[href="${cssPath}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = cssPath;
      document.head.appendChild(link);
  }

  const script = document.createElement('script');
  script.src = jsPath;
  document.body.appendChild(script);
}

// Inicializar acciones específicas para Plin
function initializePlinActions() {
  const closeButton = document.querySelector('.btn-close-plin');
  const continueButton = document.querySelector('.btn-continue-plin');

  if (closeButton) {
      closeButton.addEventListener('click', closeModal);
  }

  if (continueButton) {
      continueButton.addEventListener('click', () => {
          console.log('Número de celular ingresado correctamente en Plin');
      });
  }
}

// Función para cerrar el modal y limpiar contenido
function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContainer = document.getElementById('modal-container');

  // Ocultar el modal
  modalOverlay.classList.remove('show');
  modalOverlay.classList.add('hidden');

  // Limpiar el contenido del modal
  modalContainer.innerHTML = '';
}









function showCard() {
  document.getElementById('paymentInfo').innerHTML = `
      <div>
          <div class="input-box">
              <span>Nombre en la Tarjeta: </span>
              <input type="text" placeholder="Garcilazo Giovanni">
          </div>
          <div class="input-box">
              <span>Numero de la Tarjeta: </span>
              <input type="number" placeholder="1111 2222 3333 4444">
          </div>
          <div class="input-box">
              <span>Mes de Expiración: </span>
              <input type="text" placeholder="Septiembre">
          </div>
          <div class="flex">
              <div class="input-box">
                  <span>Año de Exp. : </span>
                  <input type="number" placeholder="2026">
              </div>
              <div class="input-box">
                  <span>CVV: </span>
                  <input type="number" placeholder="123">
              </div>
          </div>
      </div>
  `;
}
 // JavaScript for filtering courses by age and search functionality
 document.addEventListener('DOMContentLoaded', () => {
  const ageButtons = document.querySelectorAll('.age-btn');
  const searchInput = document.getElementById('search-input');
  const courseItems = document.querySelectorAll('.course-item');

  // Filtering courses by age
  ageButtons.forEach(button => {
      button.addEventListener('click', () => {
          const selectedAge = button.getAttribute('data-age');

          // Show all courses if 'Todos' button is clicked
          courseItems.forEach(item => {
              if (selectedAge === "" || item.getAttribute('data-age') === selectedAge) {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      });
  });
});
// JavaScript for filtering and searching
const searchInput = document.getElementById('search-input');
const courseItems = document.querySelectorAll('.course-item');
const ageButtons = document.querySelectorAll('.age-btn');

// Filter courses by age
ageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const ageFilter = button.getAttribute('data-age');
        courseItems.forEach(item => {
            if (ageFilter === "" || item.getAttribute('data-age') === ageFilter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});









// añades este script



// Selección del botón de perfil y el menú
const loginButton = document.querySelector('.login-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Variable para controlar si el menú está abierto
let isMenuOpen = false;

// Función para mostrar u ocultar el menú
function toggleMenu() {
  isMenuOpen = !isMenuOpen;
  dropdownMenu.style.display = isMenuOpen ? 'block' : 'none';
}

// Abrir/ocultar el menú al hacer clic en el botón de perfil
loginButton.addEventListener('click', (event) => {
  event.stopPropagation(); // Evitar que el clic se propague y cierre el menú
  toggleMenu();
});

// Cerrar el menú si se hace clic fuera del menú
document.addEventListener('click', (event) => {
  if (!dropdownMenu.contains(event.target) && event.target !== loginButton) {
    dropdownMenu.style.display = 'none'; // Cerrar el menú
    isMenuOpen = false; // Cambiar el estado
  }
});

// Evitar que el clic en el menú lo cierre accidentalmente
dropdownMenu.addEventListener('click', (event) => {
  event.stopPropagation(); // Evitar que el clic en el menú lo cierre
});





// Selección de los botones de cambio de tema
const niñosBtn = document.getElementById('niños-btn');
const adolescentesBtn = document.getElementById('adolescentes-btn');
const adultosBtn = document.getElementById('adultos-btn');

// Asegúrate de que heroSection y courseSection está definido antes de ser utilizado
const heroSection = document.querySelector('.hero');
const courseSection = document.querySelector('.section.course');

// Función para cambiar el tema
function changeTheme(theme) {
  const themeStyle = document.getElementById('theme-style');
  if (!themeStyle) {
    console.error("No se encontró el elemento con id 'theme-style'.");
    return;
  }

  // Cambiar la ruta del archivo CSS según el tema
  if (theme === 'niños') {
    themeStyle.setAttribute('href', './assets/css/style.css');
    if (heroSection) {
      heroSection.style.backgroundImage = "url('./assets/images/niños.png')";
    }
    if (courseSection) {
      courseSection.style.backgroundImage = "url('./assets/images/niños.png')";
    }
  } else if (theme === 'adolescentes') {
    themeStyle.setAttribute('href', './assets/css/style-adolescente.css');
    if (heroSection) {
      heroSection.style.backgroundImage = "url('./assets/images/FONDO-ADOLESCENTE.png')";
    }
    if (courseSection) {
      courseSection.style.backgroundImage = "url('./assets/images/FONDO-ADOLESCENTE.png')";
    }
  } else if (theme === 'adultos') {
    themeStyle.setAttribute('href', './assets/css/style.css');
    if (heroSection) {
      heroSection.style.backgroundImage = "url('./assets/images/hero-bg.jpg')";
    }
    if (courseSection) {
      courseSection.style.backgroundImage = "url('./assets/images/hero-bg.jpg')";
    }
  }

  // Guardar el tema seleccionado en localStorage
  localStorage.setItem('selectedTheme', theme);
}

// Aplicar el tema al cargar la página
function applySavedTheme() {
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    changeTheme(savedTheme);
  }
}

// Añadir los eventos de clic en los botones
if (niñosBtn) niñosBtn.addEventListener('click', () => changeTheme('niños'));
if (adolescentesBtn) adolescentesBtn.addEventListener('click', () => changeTheme('adolescentes'));
if (adultosBtn) adultosBtn.addEventListener('click', () => changeTheme('adultos'));

// Aplicar el tema al cargar la página
applySavedTheme();



// Botón para restablecer el tema
const resetThemeBtn = document.getElementById('reset-theme-btn');

if (resetThemeBtn) {
  resetThemeBtn.addEventListener('click', () => {
    localStorage.removeItem('selectedTheme'); // Elimina el tema guardado
    const themeStyle = document.getElementById('theme-style');
    themeStyle.setAttribute('href', './assets/css/style.css'); // Vuelve al tema por defecto
  });
}
//sdasdas
