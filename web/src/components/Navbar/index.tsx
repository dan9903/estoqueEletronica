import React from 'react';

import './style.css';

export default function Sidebar() {
  return (
    <div className="navbar-main">
      <ul>
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/vendas">Vendas</a></li>
        <li><a href="/estoque">Estoque</a></li>
        <li><a href="/historico-vendas">Historico de Vendas</a></li>
      </ul>
    </div>
  );
}