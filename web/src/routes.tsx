import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sales from "./pages/sales";
import Home from "./pages/home";
import Stock from "./pages/stock";
import SalesHistoric from "./pages/salesHistoric";

function Routes() {

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/vendas" component={Sales} />
        <Route path="/estoque" component={Stock} />
        <Route path="/historico-vendas" component={SalesHistoric} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
