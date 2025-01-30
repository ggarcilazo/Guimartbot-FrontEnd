// Obtener los elementos necesarios
const btnQR = document.getElementById("btn-qr");
const btnPhone = document.getElementById("btn-phone");
const qrContainer = document.getElementById("qr-container");
const phoneContent = document.getElementById("phone-content");
const paymentModal = document.querySelector('.payment-modal'); // Modal de pago
const uploadModal = document.getElementById('uploadModal'); // Modal de carga
const btnContinue = document.querySelector('.btn-continue-plin');
const btnBack = document.querySelector('.btn-back');
const btnFinalize = document.querySelector('.btn-finalize');
const btnClose = document.querySelector('.btn-close');

// Función para alternar entre Código QR y Número de celular
btnQR.addEventListener("click", () => {
    btnQR.classList.add("active");
    btnPhone.classList.remove("active");
    qrContainer.classList.remove("hidden");
    phoneContent.classList.add("hidden");
});

btnPhone.addEventListener("click", () => {
    btnPhone.classList.add("active");
    btnQR.classList.remove("active");
    phoneContent.classList.remove("hidden");
    qrContainer.classList.add("hidden");
});

// Mostrar el modal de carga y ocultar el modal de pago al hacer clic en "Continuar"
btnContinue.addEventListener('click', () => {
    paymentModal.classList.add('hidden'); // Oculta el modal de pago
    uploadModal.classList.remove('hidden'); // Muestra el modal de carga
});

// Ocultar el modal de carga y volver a mostrar el modal de pago al hacer clic en "Volver"
btnBack.addEventListener('click', () => {
    uploadModal.classList.add('hidden'); // Oculta el modal de carga
    paymentModal.classList.remove('hidden'); // Muestra el modal de pago
});

// Acción al hacer clic en "Finalizar Compra"
btnFinalize.addEventListener('click', () => {
    alert('¡Compra finalizada con éxito!');
    uploadModal.classList.add('hidden'); // Oculta el modal de carga
    paymentModal.classList.remove('hidden'); // Muestra el modal de pago
});



// Función para actualizar la vista previa de la imagen seleccionada
function updateFileName() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Establecer la imagen de vista previa
            previewImg.src = e.target.result;
            imagePreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}




// Función para manejar el evento de arrastre y soltado
const uploadBox = document.getElementById('uploadBox');
uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado
    uploadBox.classList.add('dragover'); // Cambia el estilo de fondo
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragover'); // Restaura el estilo de fondo
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado
    uploadBox.classList.remove('dragover'); // Restaura el estilo de fondo

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Establecer la imagen de vista previa
            const previewImg = document.getElementById('preview-img');
            const imagePreview = document.getElementById('image-preview');

            previewImg.src = e.target.result;
            imagePreview.classList.remove('hidden'); // Mostrar la imagen

            // Ocultar el botón y el texto
            document.querySelector('.file-input').style.display = 'none';
            document.querySelector('.select-file-button').style.display = 'none';
            document.querySelector('.upload-box p').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});


function showPreview(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewImg = document.getElementById('preview-img');
            const imagePreview = document.getElementById('image-preview');
            const uploadBox = document.getElementById('uploadBox');

            // Mostrar la imagen cargada
            previewImg.src = e.target.result;
            imagePreview.classList.remove('hidden');

            // Ocultar el botón y el texto
            document.querySelector('.file-input').style.display = 'none';
            document.querySelector('.select-file-button').style.display = 'none';
            document.querySelector('.upload-box p').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}
