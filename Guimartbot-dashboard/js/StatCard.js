import React from 'react';
import './StatCard.css';

function StatCard({ title, value }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default StatCard;
