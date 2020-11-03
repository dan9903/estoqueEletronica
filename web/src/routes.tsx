import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Sales from "./pages/sales";
import Home from "./pages/home";

function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/vendas" component={Sales} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
