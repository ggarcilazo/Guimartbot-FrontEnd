import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>Guimartbot</h2>
      <nav>
        <ul>
          <li><Link to="/">Resumen</Link></li>
          <li><Link to="/bandeja_entrada">Bandeja de Entrada</Link></li>
          <li><Link to="/usuarios">Usuarios</Link></li>
          <li><Link to="/docentes">Docentes</Link></li>
          <li><Link to="/certificados">Certificados</Link></li>
          <li><Link to="/becas">Becas</Link></li>
          <li><Link to="/pagos">Pagos</Link></li>
          <li><Link to="/recursos">Recursos</Link></li>
          <li><Link to="/estadisticas">Estadísticas</Link></li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
