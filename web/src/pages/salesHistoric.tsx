import React, { Fragment, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import '../styles/pages/salesHistoric.css';

interface Product {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  customer_id: number;
}

export default function SalesHistoric() {
  // const [solds, setSolds] = useState<Sold[]>([]);
  // const [products, setProducts] = useState<Product[]>([]);
  // const [open, setOpen] = useState(false);

  //mock do caralho
  const solds : Array<Product> = [
    {product_id: 1, product_name: 'Capacitor 110 uf', quantity: 2, price: 2, customer_id: 1 },
    {product_id: 2, product_name: 'Capacitor 250 uf', quantity: 4, price: 12, customer_id: 1 },
    {product_id: 3, product_name: 'Capacitor 20 uf', quantity: 5, price: 45, customer_id: 1 },
    {product_id: 4, product_name: 'Capacitor 220 uf', quantity: 6, price: 12, customer_id: 2 },
    {product_id: 5, product_name: 'Capacitor 260 uf', quantity: 7, price: 34, customer_id: 2 },
    {product_id: 6, product_name: 'Capacitor 1230 uf', quantity: 4, price: 13, customer_id: 2 },
  ];

  const rows = [
    createData(1, 'Jane', '121231142132', '2017-01-12', 30),
    createData(2, 'Doe', '121231142132', '2019-01-12', 20),
  ];
  

  // useEffect(() => {
  //   (async () => {
  //     api.get('sold').then(response => {
  //       setSolds(response.data);
  //     });
  //   })();
  // },[]);
  
  // useEffect(() => {
  // (async () => {
  // api.get(`sold/${id}`).then(response=>{
  // setProducts(response.data);
  // });
  // })();
  // },[id]);

  function createData(
    id: number,
    name: string,
    phone: string,
    sold_date: string,
    sold_value: number
  ) {
    return {
      id,
      name,
      phone,
      sold_date,
      sold_value,
      sold_products: solds
    };
  }

  function toggleSold() {
    //used to fetch data from database when open and delete the data when close the expansion field
  }

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = useState(false);
  
    return (
      <Fragment>
        <TableRow >
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.phone}</TableCell>
          <TableCell align="right">{row.sold_date}</TableCell>
          <TableCell align="right">{row.sold_value}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Produtos
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Produto</TableCell>
                      <TableCell>Quantidade</TableCell>
                      <TableCell align="right">Valor Unitário</TableCell>
                      <TableCell align="right">Valor Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.sold_products.filter(product => product.customer_id === row.id).map((product) => (
                      <TableRow key={product.product_id}>
                        <TableCell align="left">{product.customer_id}</TableCell>
                        <TableCell component="th" scope="row">
                          {product.product_name}
                        </TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell align="right">{product.price}</TableCell>
                        <TableCell align="right">{product.price * product.quantity }</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }

  return (
    <div className="container">
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nome</TableCell>
              <TableCell align="right">Telefone</TableCell>
              <TableCell align="right">Data da Venda</TableCell>
              <TableCell align="right">Valor da venda</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
