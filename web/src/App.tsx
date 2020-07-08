import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Sold from './components/Sales';
import Stock from './components/Stock';
import SoldHistoric from './components/SalesHistoric';


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
            <Tab>Estoque</Tab>
            <Tab>Histórico de Vendas</Tab>
          </TabList>

          <TabPanel>
            <Sold/>
          </TabPanel>
          <TabPanel>
            <Stock/>
          </TabPanel>
          <TabPanel>
            <SoldHistoric/>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
