// Seleccionamos los elementos de la página
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

// Función para ajustar el diseño en función del ancho de la pantalla
function adjustLayout() {
    const { innerWidth: screenWidth } = window;

    if (screenWidth <= 576) {
        // En pantallas muy pequeñas, ocultamos el sidebar
        sidebar.style.transform = 'translateX(-100%)';
        mainContent.style.marginLeft = '0';
    } else if (screenWidth <= 768) {
        // En pantallas medianas, mostramos un sidebar reducido
        sidebar.style.transform = 'translateX(0)';
        sidebar.style.width = '70px';
        mainContent.style.marginLeft = '70px';
    } else {
        // En pantallas grandes, mostramos el sidebar completo
        sidebar.style.transform = 'translateX(0)';
        sidebar.style.width = '250px';
        mainContent.style.marginLeft = '250px';
    }
}

// Función debounce para limitar la frecuencia de ejecución
function debounce(func, wait = 100) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Escuchamos el evento resize para ajustar el diseño en tiempo real
window.addEventListener('resize', debounce(adjustLayout));

// Ejecutamos la función una vez al cargar la página
document.addEventListener('DOMContentLoaded', adjustLayout);
