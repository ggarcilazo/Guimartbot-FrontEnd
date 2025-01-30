let editingAdminRow = null;

document.getElementById("adminForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("adminName").value;
    const email = document.getElementById("adminEmail").value;
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;
    const role = document.getElementById("adminRole").value;
    const access = Array.from(document.getElementById("adminAccess").selectedOptions).map(opt => opt.value).join(", ");

    if (editingAdminRow) {
        editingAdminRow.cells[0].textContent = name;
        editingAdminRow.cells[1].textContent = email;
        editingAdminRow.cells[2].textContent = username;
        editingAdminRow.cells[3].textContent = role;
        editingAdminRow.cells[4].textContent = access;
        editingAdminRow = null;
        alert("Administrador actualizado correctamente.");
    } else {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${username}</td>
            <td>${role}</td>
            <td>${access}</td>
            <td>
                <button class="action-button edit" onclick="showEditAdminModal('${name}', '${email}', '${username}', '${role}', '${access}')"><i class="fas fa-edit"></i></button>
                <button class="action-button delete" onclick="deleteAdmin(this)"><i class="fas fa-trash"></i></button>
            </td>
        `;
        document.getElementById("adminTableBody").appendChild(row);
        alert("Administrador añadido correctamente.");
    }
    hideAdminModal();
});

function showAddAdminModal() {
    document.getElementById("modalTitle").innerText = "Añadir Nuevo Administrador";
    document.getElementById("adminForm").reset();
    editingAdminRow = null;
    document.getElementById("adminModal").style.display = "block";
}

function showEditAdminModal(name, email, username, role, access) {
    document.getElementById("modalTitle").innerText = "Editar Administrador";
    document.getElementById("adminName").value = name;
    document.getElementById("adminEmail").value = email;
    document.getElementById("adminUsername").value = username;
    document.getElementById("adminRole").value = role;
    document.getElementById("adminAccess").value = access.split(", ");
    document.getElementById("adminModal").style.display = "block";
    editingAdminRow = event.target.closest("tr");
}

function hideAdminModal() {
    document.getElementById("adminModal").style.display = "none";
    editingAdminRow = null;
}

function deleteAdmin(button) {
    if (confirm("¿Estás seguro de que deseas eliminar este administrador?")) {
        button.closest("tr").remove();
        alert("Administrador eliminado.");
    }
}

function filterAdmins() {
    const searchText = document.querySelector(".search-bar").value.toLowerCase();
    const rows = document.querySelectorAll("#adminTableBody tr");
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(searchText) ? "" : "none";
    });
}
