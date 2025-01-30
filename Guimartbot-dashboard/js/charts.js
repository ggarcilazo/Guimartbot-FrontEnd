// charts.js
document.addEventListener("DOMContentLoaded", function () {
    // Configuración del gráfico de línea (Pagos Realizados)
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            datasets: [{
                label: 'Pagos Realizados',
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Configuración del gráfico de pastel (Total de Estudiantes)
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    new Chart(ctxPie, {
        type: 'pie',
        data: {
            labels: ['Inscritos', 'No Inscritos'],
            datasets: [{
                data: [70, 30],
                backgroundColor: ['#36a2eb', '#a64ca6'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});
