import React, { useEffect, useState, lazy, Suspense } from 'react';

import MaterialTable, { Column } from 'material-table';
import { tableIcons } from '../utils/tableIcons';
import api from '../services/api';

import '../styles/pages/salesHistoric.css';
const ProductTable = lazy(() => import ('../components/ProductTable'));

interface Customer {
  id: number,
  name: string,
  phone: string,
  createdAt: string,
  total: number,
}

export default function SalesHistoric() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const columns : Array<Column<Customer>> = [
    { title: 'Nome', field: 'name' },
    { title: 'Telefone', field: 'phone', type: 'string' },
    { title: 'Data da Venda', field: 'createdAt', type: 'date' },
    { title: 'Valor da Venda', field: 'total', type: 'currency', currencySetting: {currencyCode: 'BRL' } },
  ];
  
  useEffect( () => {
    (async () => {
      api.get('customers').then( response => {
        setCustomers(response.data);
      });
    })();
  }, []);

  return (
    <div className="container">
      <MaterialTable
        style={{
          width: '90%',
          margin: '4vh 5vw',
          padding: 'auto 1vw',
          border: '1px solid gray',
          borderRadius: '6px'
        }}
        title="Historico de Vendas"
        icons={tableIcons}
        columns={columns}
        data={customers}
        detailPanel={ row => {
            return (
              <div className="detailContent">
                <Suspense fallback={<h3>Carregando</h3> }>
                  <ProductTable key={row.id} customer_id={row.id}/> 
                </Suspense>
              </div>
            )
        }}
        />
    </div>
  );
}
