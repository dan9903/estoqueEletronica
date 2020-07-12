import React, {useState, useEffect} from 'react';
import { tableIcons } from '../../utils/tableIcons';
import MaterialTable, { Column } from 'material-table';
import api from '../../services/api';

const productColumns: Array<Column<Product>> = [
  { title: 'Nome', field: 'product_name' },
  { title: 'Quantidade', field: 'quantity', type: 'numeric' },
  { title: 'Preço', field: 'price', type: 'currency', currencySetting:{ locale: 'pt-BR', currencyCode: 'BRL', maximumFractionDigits: 2 } }
]

interface Product {
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
    <div className="cotnainer">
      <MaterialTable
        title="Produtos vendidos"
        columns={productColumns}
        icons={tableIcons}
        data={products}
        options={{
          paging:false
        }}
      />
    </div>
  );
}

export default ProductTable;