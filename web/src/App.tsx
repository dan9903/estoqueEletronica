import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import Vendas from './components/Vendas';
import AdicionarEstoque from './components/AdicionarEstoque';
import Cadastrar from './components/Cadastrar';
import ConsultarEstoque from './components/ConsultarEstoque';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Eletronica Beira-Rio</h1>
      </header>
      <div className='container'>
        <Tabs>
          <TabList>
            <Tab>Vendas</Tab>
            <Tab>Adicionar Estoque</Tab>
            <Tab default >Cadastrar</Tab>
            <Tab>Consultar Estoque</Tab>
          </TabList>

          <TabPanel>
            <Vendas/>
          </TabPanel>
          <TabPanel>
            <AdicionarEstoque/>
          </TabPanel>
          <TabPanel>
            <Cadastrar/>
          </TabPanel>
          <TabPanel>
            <ConsultarEstoque/>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
