import React from 'react';
import { Button, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import '../styles/pages/sales.css';

export default function Sales() {
  return (   
    <div className="container">
    <form id="solds-form">
      <div className="clientInfo">
        <TextField
          id="name"
          name="name"
          label="Nome"
          required
          variant="filled"
          inputProps={{ size:40 }}
          className="clientName"
        />
        <TextField
          id="phone"
          name="phone"
          label="Telefone"
          variant="filled"
          inputProps={{ maxLength: 11, size:10 }}
          className="clientPhone"
        />
      </div>
      
      <div className="productsDiv">
        
        <div className="productSearch">
          <label>Produto</label>
        </div>
        
        <div className="table">
          <TableContainer component={Paper} >
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
                      <Button ><Delete/></Button>
                    </TableCell>
                    <TableCell align="left">
                      <Select >
                      </Select>
                    </TableCell>
                  </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        
        <div className="divTotal">
          <label>Valor Total: </label>
          <TextField
            name="totalInput"
            id="totalInput"
            className="totalInput"
            
          />
          <br/>
          <Button
            variant="contained"
            type="submit"
            className=" soldButton"
          >
            Vender
          </Button>
        </div>
      </div>
    </form>  
  </div>
  );
}