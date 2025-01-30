// Variable para almacenar la fila que se está editando actualmente
let editingRow = null;

// Función para actualizar o añadir un usuario
function actualizarUsuario(e) {
    e.preventDefault();

    // Obtener los valores de los campos del formulario
    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const userDate = document.getElementById("userDate").value;
    const userPlan = document.getElementById("userPlan").value;

    // Determinar el texto para el plan seleccionado
    let planText = "";
    if (userPlan === "basic") {
        planText = "Plan Básico";
    } else if (userPlan === "expert") {
        planText = "Plan Expert";
    } else if (userPlan === "family") {
        planText = "Plan Familiar";
    }

    if (editingRow) {
        // Modo edición: actualizar la fila existente
        editingRow.cells[0].textContent = userName;
        editingRow.cells[1].textContent = userEmail;
        editingRow.cells[2].textContent = userDate;
        editingRow.cells[3].textContent = planText;

        // Actualizar el botón de edición con los nuevos datos
        const editButton = editingRow.querySelector(".edit");
        editButton.setAttribute("onclick", `showEditUserModal('${userName}', '${userEmail}', '${userDate}', '${userPlan}', this)`);

        alert("Usuario actualizado correctamente.");
        editingRow = null; // Limpiar la referencia de la fila en edición
    } else {
        // Modo añadir: crear una nueva fila en la tabla
        const userTableBody = document.getElementById("userTableBody");
        const newRow = document.createElement("tr");

        newRow.innerHTML = `
            <td>${userName}</td>
            <td>${userEmail}</td>
            <td>${userDate}</td>
            <td>${planText}</td>
            <td><span class="status active">Activo</span></td>
            <td>
                <button class="action-button edit" onclick="showEditUserModal('${userName}', '${userEmail}', '${userDate}', '${userPlan}', this)"><i class="fas fa-edit"></i></button>
                <button class="action-button toggle" onclick="toggleUserStatus(this)"><i class="fas fa-toggle-on"></i></button>
            </td>
        `;

        userTableBody.appendChild(newRow);
        alert("Usuario añadido correctamente.");
    }

    hideUserModal(); // Ocultar el modal después de guardar
}

// Función para mostrar el modal de añadir usuario
function showAddUserModal() {
    document.getElementById("modalTitle").innerText = "Añadir Nuevo Usuario";
    document.getElementById("userForm").reset();
    editingRow = null; // Limpiar la referencia de la fila en edición
    document.getElementById("userModal").style.display = "block";
}

// Función para mostrar el modal de editar usuario y establecer la fila en edición
function showEditUserModal(name, email, date, plan, button) {
    document.getElementById("modalTitle").innerText = "Editar Usuario";
    document.getElementById("userName").value = name;
    document.getElementById("userEmail").value = email;
    document.getElementById("userDate").value = date;
    document.getElementById("userPlan").value = plan;

    // Asignar la fila en edición utilizando el botón de edición
    editingRow = button.closest("tr");

    document.getElementById("userModal").style.display = "block";
}

// Función para ocultar el modal
function hideUserModal() {
    document.getElementById("userModal").style.display = "none";
    editingRow = null; // Limpiar cualquier referencia de edición al cerrar el modal
}

// Función para activar/desactivar usuario
function toggleUserStatus(button) {
    const statusElement = button.parentNode.previousElementSibling.firstElementChild;
    if (statusElement.classList.contains("active")) {
        statusElement.classList.remove("active");
        statusElement.classList.add("inactive");
        statusElement.textContent = "Inactivo";
        button.innerHTML = '<i class="fas fa-toggle-off"></i>';
    } else {
        statusElement.classList.remove("inactive");
        statusElement.classList.add("active");
        statusElement.textContent = "Activo";
        button.innerHTML = '<i class="fas fa-toggle-on"></i>';
    }
}

// Función para filtrar usuarios por búsqueda y plan
function filterUsers() {
    const searchText = document.querySelector(".search-bar").value.toLowerCase();
    const filterPlan = document.querySelector(".filter-select").value;
    const rows = document.querySelectorAll("#userTableBody tr");

    rows.forEach(row => {
        const name = row.cells[0].textContent.toLowerCase();
        const plan = row.cells[3].textContent.toLowerCase();

        const matchesSearch = name.includes(searchText);
        const matchesPlan = filterPlan === "all" || plan.includes(filterPlan);

        row.style.display = matchesSearch && matchesPlan ? "" : "none";
    });
}
