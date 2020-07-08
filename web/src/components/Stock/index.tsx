import React, {useState, useEffect,forwardRef } from 'react';
import MaterialTable, { Column, Icons } from 'material-table';
import api from '../../services/api';
import './styles.css';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox />),
    Check: forwardRef((props, ref) => <Check />),
    Clear: forwardRef((props, ref) => <Clear />),
    Delete: forwardRef((props, ref) => <DeleteOutline />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight />),
    Edit: forwardRef((props, ref) => <Edit />),
    Export: forwardRef((props, ref) => <SaveAlt />),
    Filter: forwardRef((props, ref) => <FilterList />),
    FirstPage: forwardRef((props, ref) => <FirstPage />),
    LastPage: forwardRef((props, ref) => <LastPage />),
    NextPage: forwardRef((props, ref) => <ChevronRight />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft />),
    ResetSearch: forwardRef((props, ref) => <Clear />),
    Search: forwardRef((props, ref) => <Search />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn />)
  };

interface Row {
  name: string;
  quantity: number;
  price: number;
}

export default function Stock() {
  const [products, setProducts] = useState<Row[]>([])
  const [columns, SetColumns] = useState<Array<Column<Row>>>(
    [
      { title: 'Name', field: 'name' },
      { title: 'Quantity', field: 'quantity', type: 'numeric' },
      { title: 'Price', field: 'price', type: 'numeric', currencySetting:{ locale: 'USD'} },
    ]
  );

  useEffect(()=> {
    api.get('products').then(response =>{
      setProducts(response.data);
    });
  }, []);

  function save(product: Row) {
    console.log(product);
    return ;
  }

  function update(product: Row) {

  }

  return (
    <MaterialTable
      title="Estoque de Produtos"
      columns={columns}
      data={products}
      icons={tableIcons}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              setProducts([...products, newData]);
              resolve();
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              if (oldData) {
                  const dataUpdate = [...products];
                  dataUpdate[dataUpdate.indexOf(oldData)] = newData;
                  setProducts(dataUpdate);
                resolve();
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
                const dataDelete = [...products];
                dataDelete.splice(dataDelete.indexOf(oldData), 1);
                setProducts(dataDelete);
              resolve();
            }, 600);
          }),
      }}
    />
  );
}