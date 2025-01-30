function viewPaymentDetails(id, userId, amount, date, hash, method, status) {
    document.getElementById("detailUserId").innerText = userId;
    document.getElementById("detailAmount").innerText = amount;
    document.getElementById("detailDate").innerText = date;
    document.getElementById("detailHash").innerText = hash;
    document.getElementById("detailMethod").innerText = method;
    document.getElementById("detailStatus").innerText = status;

    // Mostrar el modal de detalles
    document.getElementById("viewPaymentModal").style.display = "block";
}

function closeViewPaymentModal() {
    document.getElementById("viewPaymentModal").style.display = "none";
}

function openAddPaymentModal() {
    document.getElementById("addPaymentModal").style.display = "block";
}

function closeAddPaymentModal() {
    document.getElementById("addPaymentModal").style.display = "none";
}
function emitirRecibo(id, userId, amount, date, hash, paymentMethod, status) {
    // Obtener la fecha y hora actuales para el recibo
    const now = new Date();
    const fechaRecibo = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const horaRecibo = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Configuración del PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título del Recibo
    doc.setFontSize(18);
    doc.text("Recibo de Pago - Guimartbot", 20, 20);

    // Datos del Recibo
    doc.setFontSize(12);
    doc.text(`ID Usuario: ${userId}`, 20, 40);
    doc.text(`Monto: S/${amount}`, 20, 50);
    doc.text(`Fecha de Pago: ${date}`, 20, 60);
    doc.text(`Hora de Emisión: ${horaRecibo}`, 20, 70);
    doc.text(`Hash de Pago: ${hash}`, 20, 80);
    doc.text(`Método de Pago: ${paymentMethod}`, 20, 90);
    doc.text(`Estado: ${status}`, 20, 100);

    // Firma de emisión
    doc.text("Emitido por: Administrador", 20, 120);
    doc.text(`Fecha de Emisión: ${fechaRecibo}`, 20, 130);
    
    // Guardar y Descargar PDF
    doc.save(`Recibo_Pago_${id}.pdf`);
}
