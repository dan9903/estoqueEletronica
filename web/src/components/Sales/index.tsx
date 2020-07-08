import React, { FormEvent, useEffect, useState, ChangeEvent } from 'react';
import { Button, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import api from '../../services/api';
import ReactSelect from 'react-select';

import './styles.css';

interface Product {
  id: number,
  name: string,
  quantity: number,
  price: number,
}

interface SelectedProduct {
  id: number,
  price: number,
  quantity: number,
}

const Solds = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] =  useState<SelectedProduct[]>([]);
  const [productId, setProductId] = useState(0);

  useEffect(() => {
    api.get('products').then(response => {
      setProducts(response.data);
    });
  }, []);

  function handleOptionChange(value: any) {
    setProductId(value.value);
  }

  function handleQuantityChange(event: ChangeEvent<{name?: string, value: unknown}>) {
    const { name, value } = event.target;
    const index = selectedProducts.findIndex(product => product.id === Number(name));
    const editProducts = [...selectedProducts];
    const oldPrice = selectedProducts[index].quantity * selectedProducts[index].price; 
    
    editProducts[index].quantity = Number(value);
    
    setTotalValue( totalValue + Number(value) * selectedProducts[index].price - oldPrice);
    setSelectedProducts(editProducts);
  }
  
  function handleAddProduct() {
    if(productId > 0 ){
      const productIndex = selectedProducts.findIndex(product => product.id === productId);
      if (productIndex === -1 ) {
        var {id, price, quantity } = products.filter(product => product.id === productId)[0];
        quantity = 0;
        const product: SelectedProduct = {id, price,  quantity };
        setSelectedProducts( [ ...selectedProducts, product ] );
      }
      setProductId(0);
    }
  }

  function handleDelProduct(id: number) {
    const products = selectedProducts.filter(product => product.id !== id );
    setSelectedProducts(products);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    
    const products = selectedProducts.map( product => {
      return {
        product_id: product.id,
        quantity:  product.quantity
      }
    });

    const data= {
      name,
      phone,
      totalValue,
      products
    }
  
    try  {
      await api.post('sold', data); 
    } catch(err) {
      alert('Erro ao salvar venda, tente novamente!');
    }
    
    window.alert("sold");
  }

  return (
    <main>
      <div className="vendas">
      <form  onSubmit={handleSubmit} id="vendas-form">
        <div className="clientInfo">
          <label>Nome: </label>
          <Input type="text" id="name" name="name" className="clientName" value={name}onChange={e=>setName(e.target.value)}/>
          <br/>
          <label>Telefone: </label> 
          <Input type="tel" id="phone" name="phone" className="clientPhone" inputProps={{ maxLength: 11 }}  value={phone} onChange={e=>setPhone(e.target.value)}/>
        </div>
        <div>
          
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
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                <TableCell align="left" width="1%"></TableCell>
                  <TableCell align="left" width="1%">Qtde</TableCell>
                  <TableCell align="left" width="90%">Produto</TableCell>
                  <TableCell align="left" width="8%">Valor Unitário</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedProducts.map( product => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <Button onClick={() => {handleDelProduct(product.id)}}><Delete/></Button>
                    </TableCell>
                    <TableCell align="left">
                    
                    <Select 
                      labelId="quantity-select"
                      id="quantity"
                      onChange={handleQuantityChange}
                      inputProps={{ name: product.id }}
                    >
                      {[ ...Array( products.filter(productData => product.id === productData.id )[0].quantity )].map((x, i) => {
                            return <MenuItem value={i+1}>{i+1}</MenuItem>
                          }) }
                    </Select>

                    </TableCell>
                    <TableCell align="center">{products.filter(productData => product.id === productData.id )[0].name}</TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="divTotal">
            <label>Valor Total: </label>
            <Input 
              type="number"
              name="totalValue"
              id="totalValue"
              value={totalValue}
              className="totalInput"
              onChange={e=>setTotalValue(Number(e.target.value))}
            />
            <br/>
            <button type="submit" className="soldButton" >Vender</button>
          </div>
        </div>
       
      </form>  
      </div>
    </main>
  );
}

export default Solds;