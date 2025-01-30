const profileButton = document.querySelector('.login-btn');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Variable para almacenar la posición fija del menú
let dropdownPosition = { top: 0, left: 0 };
let menuVisible = false; // Controla la visibilidad del menú

// Función para posicionar el menú debajo del botón una sola vez
function posicionarMenu() {
  if (!menuVisible) { // Solo calcular si el menú no está visible
    const rect = profileButton.getBoundingClientRect(); // Obtener las coordenadas del botón
    dropdownPosition.top = rect.bottom + window.scrollY; // Establecer posición vertical
    dropdownPosition.left = rect.left + window.scrollX; // Establecer posición horizontal

    dropdownMenu.style.top = `${dropdownPosition.top}px`; // Aplicar posición
    dropdownMenu.style.left = `${dropdownPosition.left}px`; // Aplicar posición
  }
}

// Mostrar el menú al pasar el mouse sobre el botón
profileButton.addEventListener('mouseenter', () => {
  posicionarMenu(); // Asegurar que se posicione correctamente
  dropdownMenu.style.display = 'block'; // Mostrar el menú
  menuVisible = true; // Actualizar el estado del menú
});

// Mantener el menú visible si el cursor está sobre él
dropdownMenu.addEventListener('mouseenter', () => {
  dropdownMenu.style.display = 'block';
});

// Ocultar el menú al quitar el mouse del botón o del menú
function ocultarMenu() {
  setTimeout(() => {
    if (!dropdownMenu.matches(':hover') && !profileButton.matches(':hover')) {
      dropdownMenu.style.display = 'none';
      menuVisible = false; // Actualizar el estado del menú
    }
  }, 300); // Retardo para suavizar la interacción
}

profileButton.addEventListener('mouseleave', ocultarMenu);
dropdownMenu.addEventListener('mouseleave', ocultarMenu);

// Manejar el clic en el botón para mostrar/ocultar el menú
profileButton.addEventListener('click', () => {
  if (menuVisible) {
    ocultarMenu(); // Ocultar si está visible
  } else {
    posicionarMenu(); // Asegurarse de posicionar antes de mostrar
    dropdownMenu.style.display = 'block'; // Mostrar si no está visible
    menuVisible = true; // Actualizar el estado del menú
  }
});

// Ajustar la posición inicial del menú al cargar
window.addEventListener('load', posicionarMenu);
