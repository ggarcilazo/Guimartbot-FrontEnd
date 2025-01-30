// Función para abrir el modal de añadir ruta
function openAddRouteModal() {
    const modal = document.getElementById('routeModal');
    modal.style.display = 'block';
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };
}

// Función para abrir el modal de añadir curso
function openAddCourseModal() {
    const modal = document.getElementById('courseModal');
    modal.style.display = 'block';
    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };
}

// Función para cerrar todos los modales
function closeModal() {
    document.getElementById('routeModal').style.display = 'none';
    document.getElementById('courseModal').style.display = 'none';
    window.onclick = null; // Elimina el listener de clic en la ventana
}

// Función para confirmar eliminación de ruta
function deleteRoute() {
    if (confirm("¿Estás seguro de que quieres eliminar esta ruta?")) {
        alert('Ruta eliminada');
        // Aquí puedes añadir la lógica de eliminación de la ruta
    }
}

// Función para confirmar eliminación de curso
function deleteCourse() {
    if (confirm("¿Estás seguro de que quieres eliminar este curso?")) {
        alert('Curso eliminado');
        // Aquí puedes añadir la lógica de eliminación del curso
    }
}

// Función para editar ruta
function editRoute() {
    alert('Función para editar la ruta');
    // Aquí puedes añadir la lógica de edición de la ruta
}

// Función para editar curso
function editCourse() {
    alert('Función para editar el curso');
    // Aquí puedes añadir la lógica de edición del curso
}
