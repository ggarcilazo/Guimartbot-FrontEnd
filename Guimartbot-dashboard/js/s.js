// charts.js
document.addEventListener("DOMContentLoaded", function() {
    // Gráfico de barras ampliado
    const barCtx = document.getElementById('barChart').getContext('2d');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Estudiantes', 'Pagos', 'Becas', 'Cursos'],
            datasets: [{
                label: 'Resumen de Datos',
                data: [1200, 850, 230, 120],
                backgroundColor: ['#1e3a8a', '#2563eb', '#3b82f6', '#93c5fd'],
                borderColor: '#fff',
                borderWidth: 1,
                barThickness: 50, // Aumenta el grosor de las barras
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Permite expandir la altura del gráfico
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { font: { size: 14 } }
                },
                x: {
                    ticks: { font: { size: 14 } }
                }
            }
        }
    });

    // Gráfico de pastel ampliado
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Estudiantes', 'Pagos', 'Becas', 'Cursos'],
            datasets: [{
                data: [1200, 850, 230, 120],
                backgroundColor: ['#1e3a8a', '#2563eb', '#3b82f6', '#93c5fd']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});
