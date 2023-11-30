import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from './Home';

function App() {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Home} />
    </BrowserRouter>
  )
}

export default App;
