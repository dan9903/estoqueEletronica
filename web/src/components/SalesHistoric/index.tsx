import React, { useState } from 'react';
import MaterialTable, { Column, Icons } from 'material-table';

interface Row {
  name: string;
  surname: string,
  birthYear: number,
  birthCity: number;
}

export default function ConsultarEstoque() {
  const { useState } = React;

  const [columns, setColumns] = useState<Array<Column<Row>>>([
    { title: 'Name', field: 'name' },
    { title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
    {
      title: 'Birth Place',
      field: 'birthCity',
      lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    },
  ]);

  const [data, setData] = useState<Row[]>([
    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
  ]);

  return (
    <div className="container">
      <MaterialTable
        title="Editable Preview"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (oldData) {
                  const dataUpdate = [...data];
                  dataUpdate[data.indexOf(oldData)] = newData;
                  setData([...dataUpdate]);
                  resolve();
                }
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                dataDelete.splice(data.indexOf(oldData), 1);
                setData([...dataDelete]);
                
                resolve();
              }, 1000)
            }),
        }}
      />
    </div>
  );
}
