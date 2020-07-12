import React, { useState, useEffect } from 'react';
import MaterialTable, { Column } from 'material-table';
import { tableIcons } from '../../utils/tableIcons';
import ProductsTable from './productsTable';
import api from '../../services/api';

import './styles.css';

interface Sold {
  id: number,
  name: string;
  phone: string,
  sold_date: number,
}

const columns : Array<Column<Sold>> = [
    { title: 'Nome', field: 'name' },
    { title: 'Telefone', field: 'phone', type: 'string' },
    { title: 'Data da Venda', field: 'sold_date', type: 'date' }
];

export default function Stock() {
  const [solds, setSolds] = useState<Sold[]>([]);
  const [id, setid] = useState(0);

  useEffect(() => {
    (async () => {
      api.get('sold').then(response => {
        setSolds(response.data);
      });
    })();
  },[]);
  
  return (
    <div className="container">
      <MaterialTable
        title="Editable Preview"
        icons={tableIcons}
        columns={columns}
        data={solds}
        detailPanel={[{
          tooltip: 'Mostrar Produtos',
          render: rowData => {
            setid(rowData.id);
            return (
              <div className="detailContent">
                <ProductsTable id={id}/>
              </div>
            )
          }
        }]}/>
    </div>
  );
}
