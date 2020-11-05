import React from 'react';
import { Button, Input, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import ReactSelect from 'react-select';

import '../styles/pages/sales.css';

export default function Sales() {
  const products = [
    {name: 'Capacitor', id: 'Capacitor'},
    {name: 'Transistor', id: 'Transistor'},
    {name: 'Fonte', id: 'Fonte'},
    {name: 'Controle de TV', id: 'Controle de TV'},
  ];

  const selectedProducts = [
    {id: 0, quantity: 0,name: 'Capacitor', price: 0},
    {id: 0, quantity: 0,name: 'Transistor', price: 0},
    {id: 0, quantity: 0,name: 'Fonte', price: 0}
  ];

  function handleOptionChange(value: any) {
    console.log(value.value);
  }

  function handleAddProduct() {
    alert('Product added')
    // if(productId > 0 ){
    //   const productIndex = selectedProducts.findIndex(product => product.id === productId);
    //   if (productIndex === -1 ) {
    //     var {id, price, quantity } = products.filter(product => product.id === productId)[0];
    //     quantity = 0;
    //     const product: SelectedProduct = {id, price,  quantity };
    //     setSelectedProducts( [ ...selectedProducts, product ] );
    //   }
    //   setProductId(0);
    // }
  }

  function handleDelProduct(id: number) {
    alert('Delete product: '+ id);
  }


  return (   
    <div className="container">
      <form id="solds-form" >
        <div className="clientInfo">
          <TextField
            id="name"
            name="name"
            label="Nome"
            required
            variant="outlined"
            inputProps={{ size:50 }}
            className="clientName"
          />
          <TextField
            id="phone"
            name="phone"
            label="Telefone"
            variant="outlined"
            inputProps={{ maxLength: 11, size:10 }}
            className="clientPhone"
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
              <Button color="primary" onClick={handleAddProduct}>Adicionar</Button>
          </div>
        
          <div className="table">
            <TableContainer component={Paper} >
              <Table size="medium">
                <TableHead>
                  <TableRow>
                  <TableCell align="left" width="1%"></TableCell>
                    <TableCell align="left" width="1%">Qtde</TableCell>
                    <TableCell align="left" width="90%">Produto</TableCell>
                    <TableCell align="left" width="8%">Valor Unitário</TableCell>
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
                        labelId="quantity-select"
                        id="quantity"
                        // onChange={handleQuantityChange}
                        inputProps={{ name: product.id }}
                      >
                        <MenuItem value="0">quantity</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell align="center">{product.name}</TableCell>
                    <TableCell align="right">R$ {product.price}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Desconto</TableCell>
                  <TableCell align="right"><Input type="number"  name="desconto" /></TableCell>
                  <TableCell align="right">10</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">10</TableCell>
                </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        
          <div className="divTotal">
            <Button
              variant="contained"
              type="submit"
              className=" soldButton"
            >Vender</Button>
          </div>
        </div>
      </form>  
  </div>
  );
}