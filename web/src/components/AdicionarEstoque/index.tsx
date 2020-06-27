import React from 'react';
import { Input } from '@material-ui/core';

import './styles.css';

const AdicionarEstoque = () => {
  
  function handleSubmit() {

  }

  return (
    <main>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Produto: </label>
          <Input type="text" name="searcher"/>
          <br/>
          <label>Quantidade: </label>
          <Input type="numer" />
          <br/>
          <button type="submit">Atualizar</button>
        </form>
      </div>
    </main>
  );
}

export default AdicionarEstoque;