import React, { FormEvent } from 'react';
import { Button, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import './styles.css';

const Vendas = () => {
  
  function handleAddProduct() {
    window.alert("adicionando item");
  }

  function handleDelProduct() {
    window.alert("deletando item");
  }
  
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    window.alert("sold");
  }

  return (
    <main>
      <div className="vendas">
      <form  onSubmit={handleSubmit} id="vendas-form">
        <div className="clientInfo">
          <label>Nome: </label>
          <Input type="text" name="name" className="clientName"/>
          <br/>
          <label>Telefone: </label> 
          <Input type="tel" name="phone" className="clientPhone" inputProps={{ maxLength: 11 }}/>
        </div>
        <div>
          
        </div>
        <div className="productsDiv">
          <div className="productSearch">
            <label>Produto</label>
            <Input type="text" className="inputSearch"/>
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
                <TableRow key="1">
                  <TableCell>
                    <Button onClick={handleDelProduct} > <Delete/> </Button>
                  </TableCell>
                  <TableCell align="left">
                  <Select native
                      inputProps={{
                        name: 'Qte',
                        id: 'age-native-simple',
                      }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </Select>
                  </TableCell>
                  <TableCell align="center">alto-falante</TableCell>
                  <TableCell align="right">R$ 500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                   <Button onClick={handleDelProduct} > <Delete/> </Button>
                  </TableCell>
                  <TableCell align="left">
                  <Select native
                      inputProps={{
                        name: 'Qte',
                        id: 'age-native-simple',
                      }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </Select>
                  </TableCell>
                  <TableCell align="center">alto-falante pionner</TableCell>
                  <TableCell align="right">R$ 300</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button onClick={handleDelProduct} > <Delete/> </Button>
                  </TableCell>
                  <TableCell align="left">
                  <Select native
                      inputProps={{
                        name: 'Qte',
                        id: 'age-native-simple',
                      }}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </Select>
                  </TableCell>
                  <TableCell align="center">alto-falante pionner</TableCell>
                  <TableCell align="right">R$ 300</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <div className="divTotal">
            <label>Valor Total: </label>
            <Input type="currency" className="totalInput" name="totalValue" inputProps={{maxLength: 7 }} />
            <br/>
            <button type="submit" className="soldButton" >Vender</button>
          </div>
        </div>
       
      </form>  
      </div>
    </main>
  );
}

export default Vendas;