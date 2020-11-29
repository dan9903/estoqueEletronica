import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Button, Input, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ReactSelect from 'react-select';
import api from '../services/api';

import '../styles/pages/sales.css';

interface Product {
  id: number;
  name: string;
  amount: number;
  price: number;
}

interface SelectedProduct {
  id: number,
  price: number,
  amount: number,
}


export default function Sales() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [discount, setDiscount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [productId, setProductId] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] =  useState<SelectedProduct[]>([]);

  useEffect(() => {
    api.get('products').then(response => {
      setProducts(response.data);
    });
  }, []);
  
  useEffect(() => {
    setTotal( subTotal-discount); 
  }, [discount, subTotal])

  function handleOptionChange (value: any) {
    setProductId(value.value);
  }

  function handleAddProduct() {
    if(productId > 0 ) {
      const productIndex = selectedProducts.findIndex(product => product.id === productId);
      if (productIndex === -1 ) {
        var {id, price, amount } = products.filter(product => product.id === productId)[0];
        amount = 0;
        const product: SelectedProduct = {id, price,  amount };
        setSelectedProducts( [ ...selectedProducts, product ] );
      }
      setProductId(0);
    }
  }

  function handleQuantityChange(event: ChangeEvent<{name?: string, value: unknown}>) {
    const { name, value } = event.target;
    const index = selectedProducts.findIndex(product => product.id === Number(name));
    const editProducts = [...selectedProducts];
    const oldPrice = selectedProducts[index].amount * selectedProducts[index].price; 
    
    editProducts[index].amount = Number(value);
    
    setSubTotal( subTotal + Number(value) * selectedProducts[index].price - oldPrice);
    setSelectedProducts(editProducts);
  }

  function handleDelProduct(id: number) {
    const products = selectedProducts.filter(product => product.id !== id );
    setSelectedProducts(products);
  }

  function clearForm() {
    setName('');
    setPhone('');
    setSubTotal(0);
    setTotal(0);
    setSelectedProducts([]);
  }
  
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    const productsSold = selectedProducts.map( product => {
      return {
        productId: product.id,
        amount:  product.amount
      }
    });

    const data= {
      name,
      phone,
      total,
      productsSold
    }
  
    try  {
      await api.post('customers', data); 
      clearForm();
    } catch(err) {
      console.log(err);
      alert('Erro ao salvar venda, tente novamente!');
    }
  }

  return (   
    <div className="container">
      <form id="solds-form" onSubmit={handleSubmit} >
        <div className="clientInfo">
          <TextField
            id="name"
            name="name"
            label="Nome"
            required
            variant="outlined"
            inputProps={{ size:50 }}
            className="clientName"
            value={name}
            onChange={e=>setName(e.target.value)}
          />
          <TextField
            id="phone"
            name="phone"
            label="Telefone"
            variant="outlined"
            inputProps={{ maxLength: 11, size:10 }}
            className="clientPhone"
            value={phone}
            onChange={e=>setPhone(e.target.value)}
          />
        </div>
      
        <div className="productsDiv">
          
          <div className="productSearch">
            <label>Produto</label>
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
              <Button color="primary" className="btnSales"  onClick={handleAddProduct}>Adicionar</Button>
          </div>
        
          <div className="table">
            <TableContainer component={Paper} >
              <Table size="medium">
                <TableHead>
                  <TableRow>
                  <TableCell align="left" width="1%"></TableCell>
                    <TableCell align="left" width="1%">Qtde</TableCell>
                    <TableCell align="left" width="88%">Produto</TableCell>
                    <TableCell align="left" width="10%">Valor Unitário</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                { selectedProducts.map( product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleDelProduct(product.id)}}
                      ><Delete/></Button>
                    </TableCell>
                    <TableCell align="left">
                    <Select 
                        labelId="amount-select"
                        id="amount"
                        onChange={handleQuantityChange}
                        inputProps={{ name: product.id }}
                      >
                        {[ ...Array( products.filter(productData => product.id === productData.id )[0].amount )].map((x, i) => {
                              return <MenuItem value={i+1}>{i+1}</MenuItem>
                            }) }
                      </Select>
                    </TableCell>
                    <TableCell align="center">{products.filter(productData => product.id === productData.id )[0].name}</TableCell>
                    <TableCell align="right">R$ {product.price}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">R$ {subTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Desconto</TableCell>
                  <TableCell align="right">
                    <Input
                      type="number"
                      name="discount"
                      id="discount"
                      value={discount}
                      onChange={e=>setDiscount(Number(e.target.value))}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell id="total">R$ {total}</TableCell>
                </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        
          <div className="divTotal">
            <Button
              variant="contained"
              type="submit"
              className= "btnSales"
            >Vender</Button>
          </div>
        </div>
      </form>  
  </div>
  );
}
