import React, { FormEvent } from 'react';
import { Input } from '@material-ui/core';

import './styles.css';

const Cadastrar = () => {

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    window.alert("salvando do cadastrar");
  }

  return (
    <main>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Produto: </label>
          <Input type="text"/>
          <br/>
          <label>Quantidade: </label>
          <Input type="number" inputProps={{ max: "1000", maxLength: 4 }}/>
          <br/>
          <label>Preço: </label>
          <Input type="currency" className="unitInput" name="unitValue" inputProps={{maxLength: 7 }} />
          <br/>
          <button type="submit">Adicionar</button>
        </form>
      </div>
    </main>
  );
}

export default Cadastrar;