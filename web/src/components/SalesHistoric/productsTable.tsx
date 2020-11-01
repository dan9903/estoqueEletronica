import React, {useState, useEffect} from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import api from '../../services/api';


interface Product {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}

interface Props {
  id: number;
}

const ProductTable: React.FC<Props> = ({id}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      api.get(`sold/${id}`).then(response=>{
      setProducts(response.data);
      });
    })();
  },[id]);

  return (
    <div className="container">
     <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" width="2%">Qtde</TableCell>
                  <TableCell align="center" width="90%">Produto</TableCell>
                  <TableCell align="left" width="8%">Valor Unitário</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { products.map(product=>(
                <TableRow key={product.id}>
                  <TableCell align="center">{product.quantity}</TableCell>
                  <TableCell align="center">{product.product_name}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                </TableRow>
                )) }
              </TableBody>
            </Table>
          </TableContainer>
    </div>
  );
}

export default ProductTable;