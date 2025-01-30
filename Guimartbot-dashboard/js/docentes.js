// Variable para almacenar la fila que se está editando actualmente
let editingRow = null;

// Función para actualizar o añadir un docente
document.getElementById("docenteForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    const docenteName = document.getElementById("docenteName").value;
    const docenteEmail = document.getElementById("docenteEmail").value;
    const docentePhone = document.getElementById("docentePhone").value;
    const docenteAge = document.getElementById("docenteAge").value;
    const docenteLocation = document.getElementById("docenteLocation").value;
    const docenteCourses = document.getElementById("docenteCourses").value;

    if (editingRow) {
        // Modo edición: actualizar la fila existente
        editingRow.cells[0].textContent = docenteName;
        editingRow.cells[1].textContent = docenteEmail;
        editingRow.cells[2].textContent = docentePhone;
        editingRow.cells[3].textContent = docenteAge;
        editingRow.cells[4].textContent = docenteLocation;
        editingRow.cells[5].textContent = docenteCourses;

        alert("Docente actualizado correctamente.");
        editingRow = null; // Limpiar la referencia de la fila en edición
    } else {
        // Modo añadir: crear una nueva fila en la tabla
        const docenteTableBody = document.getElementById("docenteTableBody");
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${docenteName}</td>
            <td>${docenteEmail}</td>
            <td>${docentePhone}</td>
            <td>${docenteAge}</td>
            <td>${docenteLocation}</td>
            <td>${docenteCourses}</td>
            <td>
                <button class="action-button edit" onclick="showEditDocenteModal('${docenteName}', '${docenteEmail}', '${docentePhone}', '${docenteAge}', '${docenteLocation}', '${docenteCourses}', this)"><i class="fas fa-edit"></i></button>
                <button class="action-button delete" onclick="deleteDocente(this)"><i class="fas fa-trash"></i></button>
            </td>
        `;
        docenteTableBody.appendChild(newRow);

        alert("Docente añadido correctamente.");
    }

    hideDocenteModal(); // Ocultar el modal después de guardar
});

// Función para mostrar el modal de añadir docente
function showAddDocenteModal() {
    document.getElementById("modalTitle").innerText = "Añadir Nuevo Docente";
    document.getElementById("docenteForm").reset();
    editingRow = null; // Limpiar la referencia de la fila en edición
    document.getElementById("docenteModal").style.display = "block";
}

// Función para mostrar el modal de editar docente y establecer la fila en edición
function showEditDocenteModal(name, email, phone, age, location, courses, button) {
    document.getElementById("modalTitle").innerText = "Editar Docente";
    document.getElementById("docenteName").value = name;
    document.getElementById("docenteEmail").value = email;
    document.getElementById("docentePhone").value = phone;
    document.getElementById("docenteAge").value = age;
    document.getElementById("docenteLocation").value = location;
    document.getElementById("docenteCourses").value = courses;

    // Asignar la fila en edición utilizando el botón de edición
    editingRow = button.closest("tr");

    document.getElementById("docenteModal").style.display = "block";
}

// Función para ocultar el modal
function hideDocenteModal() {
    document.getElementById("docenteModal").style.display = "none";
    editingRow = null; // Limpiar cualquier referencia de edición al cerrar el modal
}

// Función para eliminar un docente
function deleteDocente(button) {
    if (confirm("¿Estás seguro de que deseas eliminar este docente?")) {
        const row = button.closest("tr");
        row.remove();
        alert("Docente eliminado correctamente.");
    }
}

// Función para filtrar docentes por búsqueda
function filterDocentes() {
    const searchText = document.querySelector(".search-bar").value.toLowerCase();
    const rows = document.querySelectorAll("#docenteTableBody tr");

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const email = row.cells[1].textContent.toLowerCase();
        const courses = row.cells[5].textContent.toLowerCase();

        const matchesSearch = name.includes(searchText) || email.includes(searchText) || courses.includes(searchText);

        row.style.display = matchesSearch ? "" : "none";
    });
}
