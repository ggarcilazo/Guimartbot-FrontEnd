// Filtrar certificados por ID de Certificado o por Nombre del Curso
function filterCertificates() {
    const searchText = document.querySelector('.search-bar').value.toLowerCase();
    const rows = document.querySelectorAll('#certificadoTableBody tr');

    rows.forEach(row => {
        const idCertificado = row.cells[0].textContent.toLowerCase();
        const nombreCurso = row.cells[2].textContent.toLowerCase();

        const matches = idCertificado.includes(searchText) || nombreCurso.includes(searchText);
        row.style.display = matches ? '' : 'none';
    });
}

// Función para mostrar los detalles en un modal
function showCertificateDetails(id) {
    const certificate = certificates.find(cert => cert.id === id); // Suponiendo que tienes una lista de certificados
    if (certificate) {
        document.getElementById('modalTitle').innerText = `Detalles del Certificado ${id}`;
        document.getElementById('modalContent').innerHTML = `
            <p><strong>ID Certificado:</strong> ${certificate.id}</p>
            <p><strong>ID Usuario:</strong> ${certificate.userId}</p>
            <p><strong>Nombre del Curso:</strong> ${certificate.courseName}</p>
            <p><strong>Fecha de Finalización:</strong> ${certificate.endDate}</p>
        `;
        document.getElementById('certificateModal').style.display = 'block';
    }
}

// Función para cerrar el modal de detalles
function closeCertificateModal() {
    document.getElementById('certificateModal').style.display = 'none';
}

// Función para descargar el PDF con los detalles del certificado
function downloadCertificate(id) {
    const certificate = certificates.find(cert => cert.id === id); // Suponiendo que tienes una lista de certificados
    if (certificate) {
        const { jsPDF } = window.jspdf; // Asegúrate de que jsPDF esté cargado
        const doc = new jsPDF();

        doc.setFontSize(14);
        doc.text('Detalles del Certificado', 10, 10);
        doc.setFontSize(12);
        doc.text(`ID Certificado: ${certificate.id}`, 10, 20);
        doc.text(`ID Usuario: ${certificate.userId}`, 10, 30);
        doc.text(`Nombre del Curso: ${certificate.courseName}`, 10, 40);
        doc.text(`Fecha de Finalización: ${certificate.endDate}`, 10, 50);

        doc.save(`Certificado_${certificate.id}.pdf`);
    }
}

// Datos de ejemplo para certificados
const certificates = [
    { id: '001', userId: '123', courseName: 'Curso de Java', endDate: '2023-05-10' },
    { id: '002', userId: '124', courseName: 'Curso de Python', endDate: '2023-06-15' },
    // Agrega más certificados aquí según sea necesario
];

// Inicializar botones de detalles y descarga
document.querySelectorAll('.action-button.view').forEach(button => {
    button.addEventListener('click', () => showCertificateDetails(button.dataset.id));
});
document.querySelectorAll('.action-button.download').forEach(button => {
    button.addEventListener('click', () => downloadCertificate(button.dataset.id));
});
