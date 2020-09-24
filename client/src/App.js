import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Update from './components/Update';
import Home from './components/Home';
import Create from './components/Create';
import Catalog from './components/Catalog';
import Delete from './components/Delete';
import 'fontsource-roboto';

function App() {
  return (
    <Router>
      <div className="app">
          <div className="menu">
            <span className="menuBlock" />
            <span className="menuLine" />
            <div className="menuLinks">
            <Link className="homeMenuLink" to="/" />
              <Link className="menuLink" to="/catalog">Catalog</Link>
            </div>  
          </div>
        <div className="body">
          <Switch>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/update">
              <Update />
            </Route>
            <Route path="/catalog">
              <Catalog />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
