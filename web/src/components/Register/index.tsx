import React, { FormEvent, useState } from 'react';
import { Input } from '@material-ui/core';
import api from '../../services/api';

import './styles.css';

const Cadastrar = () => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {name, quantity, price};
    try {
      await api.post('add', data);
    } catch(err) {
      window.alert('Erro ao salvar, tente novamente');
    }

    window.alert("salvando do cadastrar");
  }

  return (
    <main>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Produto: </label>
          <Input type="text" value={name} onChange={e=>setName(e.target.value)} />
          <br/>
          <label>Quantidade: </label>
          <Input type="number" value={quantity} onChange={e=>setQuantity(Number(e.target.value))} inputProps={{ max: "1000", maxLength: 4 }}/>
          <br/>
          <label>Preço: </label>
          <Input type="currency" value={price} onChange={e=>setPrice(Number(e.target.value))} className="unitInput" name="unitValue" inputProps={{maxLength: 7 }} />
          <br/>
          <button type="submit">Adicionar</button>
        </form>
      </div>
    </main>
  );
}

export default Cadastrar;