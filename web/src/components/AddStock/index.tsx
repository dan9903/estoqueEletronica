import React, { useState, useEffect, FormEvent } from 'react';
import { Input } from '@material-ui/core';
import ReactSelect from 'react-select';
import api from '../../services/api';

import './styles.css';

interface Product {
  id: number,
  name: string,
  quantity: number,
  price: number
}

const AdicionarEstoque = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [id, setId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    api.get('products').then( response =>{
      setProducts(response.data);
    });
  }, []);

  function handleOptionChange(value: any) {
    const {id, quantity, name, price} = products.filter( product => product.id === value.value )[0];
    setId(id);
    setQuantity(quantity);
    setName(name);
    setPrice(price);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {id, quantity, name, price};
    try {
      await api.put('update', data);
    } catch (err) {
      console.log(err);
      window.alert('Erro ao atualizar estoque, tente novamente');
    }
  }

  return (
    <main>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>Produto: </label>
          <ReactSelect 
              className="inputSearch"
              options= { products.map(
                  product => { 
                    return {
                      value: product.id,
                      label:  product.name
                    } 
                  })}
              onChange={handleOptionChange}
              />
          <br/>
          <label>Quantidade: </label>
          <Input
            id="quantity"
            className="quantity"
            name="quantity"
            type="number"
            value={quantity}
            onChange={e=>{setQuantity(Number(e.target.value))}}
          />
          <br/>
          <button type="submit">Atualizar</button>
        </form>
      </div>
    </main>
  );
}

export default AdicionarEstoque;