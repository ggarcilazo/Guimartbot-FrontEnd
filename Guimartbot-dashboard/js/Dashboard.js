import React from 'react';
import StatCard from './StatCard';
import Chart from './Chart';
import DataTable from './DataTable';
import './Dashboard.css';

function Dashboard() {
  return (
    <main className="dashboard">
      <h1>Resumen de Estadísticas</h1>
      <section className="stats-cards">
        <StatCard title="Total de Estudiantes" value="1200" />
        <StatCard title="Pagos Realizados" value="850" />
        <StatCard title="Becas Aprobadas" value="230" />
        <StatCard title="Cursos Completados" value="120" />
      </section>
      <section className="charts">
        <Chart type="bar" />
        <Chart type="pie" />
      </section>
      <section className="data-tables">
        <DataTable title="Estudiantes Recientes" />
        <DataTable title="Pagos Recientes" />
      </section>
    </main>
  );
}

export default Dashboard;
