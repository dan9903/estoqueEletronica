import React, { Fragment, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import api from '../../services/api';

import './style.css';

interface Product {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
  customer_id: number;
}

interface Props {
  customer_id: number;
}

const ProductTable: React.FC<Props> = ({customer_id}) =>  {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get(`sold/${customer_id}`).then(response => {
      setProducts(response.data);
    })
  }, [customer_id]);

  return (
    <Fragment>
      <TableCell className="title" style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Box margin={1}>
          <div className="container-purchases-table">
            <Table size="small" aria-label="purchases" id="table">
              <TableHead>
                <TableRow>
                  <TableCell className="sub-title">Produto</TableCell>
                  <TableCell className="sub-title" align="right">Quantidade</TableCell>
                  <TableCell className="sub-title" align="right">Valor Unitário</TableCell>
                  <TableCell className="sub-title" align="right">Valor Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.product_id}>
                    <TableCell className="product-data" component="th" scope="row">
                      {product.product_name}
                    </TableCell >
                    <TableCell className="product-data" align="right">{product.quantity}</TableCell>
                    <TableCell className="product-data" align="right">{product.price}</TableCell>
                    <TableCell className="product-data" align="right">{product.price * product.quantity }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Box>
      </TableCell>
    </Fragment>
  );
}

export default ProductTable;