// Variables
const addCursoButton = document.querySelector('.add-curso-button');
const cursoTable = document.querySelector('.curso-table tbody');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const sendButton = document.querySelector('.send-button');
const modalTitle = document.querySelector('.modal h3');
let editingCurso = null; // Para saber si estamos editando un curso

// Abrir Modal para Agregar Curso
addCursoButton.addEventListener('click', () => {
    modal.style.display = 'block';
    modalTitle.textContent = 'Agregar Nuevo Curso';
    resetModal();
    editingCurso = null; // Estamos agregando un nuevo curso, no editando
});

// Cerrar Modal
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Función para Agregar o Editar Curso
sendButton.addEventListener('click', () => {
    const cursoName = document.querySelector('.modal input[name="curso-name"]').value;
    const cursoCode = document.querySelector('.modal input[name="curso-code"]').value;
    
    if (!cursoName || !cursoCode) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    if (editingCurso) {
        // Editando un curso existente
        editingCurso.querySelector('.curso-name').textContent = cursoName;
        editingCurso.querySelector('.curso-code').textContent = cursoCode;
    } else {
        // Agregando un nuevo curso
        const newRow = document.createElement('tr');
        newRow.classList.add('curso-row');
        newRow.innerHTML = `
            <td class="curso-name">${cursoName}</td>
            <td class="curso-code">${cursoCode}</td>
            <td>
                <button class="action-button edit">Editar</button>
                <button class="action-button delete">Eliminar</button>
            </td>
        `;
        cursoTable.appendChild(newRow);

        // Agregar eventos a los botones de editar y eliminar
        newRow.querySelector('.edit').addEventListener('click', () => editCurso(newRow));
        newRow.querySelector('.delete').addEventListener('click', () => deleteCurso(newRow));
    }

    // Cerrar el modal
    modal.style.display = 'none';
    resetModal();
});

// Función para Editar Curso
function editCurso(cursoRow) {
    const cursoName = cursoRow.querySelector('.curso-name').textContent;
    const cursoCode = cursoRow.querySelector('.curso-code').textContent;

    modal.style.display = 'block';
    modalTitle.textContent = 'Editar Curso';
    document.querySelector('.modal input[name="curso-name"]').value = cursoName;
    document.querySelector('.modal input[name="curso-code"]').value = cursoCode;

    editingCurso = cursoRow; // Guardar el curso que estamos editando
}

// Función para Eliminar Curso
function deleteCurso(cursoRow) {
    if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
        cursoRow.remove();
    }
}

// Resetear el formulario del modal
function resetModal() {
    document.querySelector('.modal input[name="curso-name"]').value = '';
    document.querySelector('.modal input[name="curso-code"]').value = '';
}

