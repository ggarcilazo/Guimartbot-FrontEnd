import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      {/* Contenedor principal con la clase app-container */}
      <div className="app-container">
        <Sidebar /> {/* Sidebar a la izquierda */}
        <div className="content"> {/* Contenido principal a la derecha */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Otras rutas adicionales pueden ir aquí */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
