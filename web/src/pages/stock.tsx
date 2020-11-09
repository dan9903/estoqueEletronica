import React, {useEffect, useState } from 'react';
import MaterialTable, { Column } from 'material-table';
import { tableIcons } from '../utils/tableIcons';
import api from '../services/api';

import '../styles/pages/stock.css';

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function Stock() {
  const [products, setProducts] = useState<Product[]>([]);
  const columns: Array<Column<Product>> =  [
      { title: 'Nome', field: 'name' },
      { title: 'Quantidade', field: 'quantity', type: 'numeric' },
      { title: 'Preço', field: 'price', type: 'currency', currencySetting:{ locale: 'pt-BR', currencyCode: 'BRL', maximumFractionDigits: 2 } }
  ];

  useEffect(()=> {
    api.get('products').then(response =>{
      setProducts(response.data);
    });
  }, []);

  async function saveProduct(product: Product) {
    try {
      await api.post('add', product);
      setProducts([...products, product]);
    } catch (err) {
      console.log(err);
      window.alert('Erro ao salvar estoque, tente novamente');
    }
  }

  async function updateProduct(newProduct: Product, oldProduct: Product) {
    try {
      await api.put('update', newProduct);
      const productUpdate = [...products];
      productUpdate[productUpdate.indexOf(oldProduct)] = newProduct;
      setProducts(productUpdate);

    } catch (err) {
      console.log(err);
      window.alert('Erro ao atualizar o produto, tente novamente!');
    }
  }
  async function deleteProduct(product: Product) {
    try {
      await api.delete(`delete/${product.id}`);
      const productDelete = [...products];
      productDelete.splice(productDelete.indexOf(product), 1);
      setProducts(productDelete);
    } catch (err) {
      console.log(err);
      window.alert('Erro ao deletar o produto, tente novamente');
    }
  }

  return (
    <div className="container">
      <MaterialTable
        style={{
          width: '90%',
          margin: '4vh 5vw',
          border: '1px solid gray',
          borderRadius: '6px'
        }}
        title="Estoque de Produtos"
        columns={columns}
        data={products}
        icons={tableIcons}
        editable={{
          onRowAdd: (newProduct) =>
            new Promise((resolve) => {
              setTimeout(() => {
                saveProduct(newProduct);
                resolve();
              }, 600);
            }),
          onRowUpdate: (newProduct, oldProduct) =>
            new Promise((resolve) => {
              setTimeout(() => {
                if (oldProduct) {
                  updateProduct(newProduct, oldProduct);
                  resolve();
                }
              }, 600);
            }),
          onRowDelete: (oldProduct) =>
            new Promise((resolve) => {
              setTimeout(() => {
                  deleteProduct(oldProduct);
                resolve();
              }, 600);
            }),
        }}
      />
    </div>
  );
}