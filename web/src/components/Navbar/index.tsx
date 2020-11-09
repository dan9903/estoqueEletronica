import React from 'react';
import { NavLink } from 'react-router-dom';

import './style.css';

const Sidebar = () => {
  return (
    <div className="navbar-main">
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active">Home</NavLink>
        </li>
        <li>
          <NavLink to="/vendas" activeClassName="active">Vendas</NavLink>
        </li>
        <li>
          <NavLink to="/estoque" activeClassName="active">Estoque</NavLink>
        </li>
        <li>
          <NavLink to="/historico-vendas" activeClassName="active">Histórico de Vendas</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;