import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from './Home';
import Product from './Product';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Home} />
      <Route path='/product' component={Product} />
    </BrowserRouter>
  )
}

export default App;
