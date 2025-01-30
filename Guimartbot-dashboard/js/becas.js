document.addEventListener('DOMContentLoaded', function () {
    // Función para abrir el modal y mostrar los detalles del solicitante
    window.openModal = function(solicitante, mensaje, pdfUrl) {
        document.getElementById('modalSolicitante').innerText = solicitante;
        document.getElementById('modalMensaje').innerText = mensaje;
        document.getElementById('modalPdfLink').href = pdfUrl;

        // Muestra el modal
        document.getElementById('modal').style.display = 'block';

        // Guarda el elemento de estado de la fila actual para usarlo después
        const currentRow = document.querySelector(`.gestion-button[onclick*="${solicitante}"]`).closest('tr');
        document.getElementById('acceptButton').dataset.rowId = currentRow.rowIndex;
        document.getElementById('denyButton').dataset.rowId = currentRow.rowIndex;
    };

    // Función para cerrar el modal
    window.closeModal = function() {
        document.getElementById('modal').style.display = 'none';
    };

    // Función para aceptar la beca y actualizar el estado
    window.aceptarBeca = function() {
        let rowIndex = document.getElementById('acceptButton').dataset.rowId;
        let statusCell = document.querySelector(`tbody tr:nth-child(${rowIndex}) .status`);
        
        statusCell.innerText = "Aprobado";
        statusCell.className = "status approved"; // Cambia la clase para aplicar el estilo aprobado
        
        closeModal();
    };

    // Función para denegar la beca y actualizar el estado
    window.denegarBeca = function() {
        let rowIndex = document.getElementById('denyButton').dataset.rowId;
        let statusCell = document.querySelector(`tbody tr:nth-child(${rowIndex}) .status`);
        
        statusCell.innerText = "Denegado";
        statusCell.className = "status denied"; // Cambia la clase para aplicar el estilo denegado
        
        closeModal();
    };
});
