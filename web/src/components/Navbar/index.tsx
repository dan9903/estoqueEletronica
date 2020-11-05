import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const Sidebar = () => {
  return (
    <div className="navbar-main">
      <ul>
        <li>
          <Link to="/" className="active">Home</Link>  
        </li>
        <li>
          <Link to="/vendas">Vendas</Link>
          </li>
        <li>
          <Link to="/estoque">Estoque</Link>
        </li>
        <li>
          <Link to="/historico-vendas">Historico de Vendas</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;