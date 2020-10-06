import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import UpdateAnime from './components/Update/Anime';
import Home from './components/Home';
import CreateAnime from './components/Create/Anime';
import CreateRole from './components/Create/Role';
import CreateAnimeComplex from './components/Create/AnimeComplex';
import Anime from './components/Anime';
import AnimeComplex from './components/AnimeComplex';
import 'fontsource-roboto';
import Users from './components/Users';
import Roles from './components/Roles';
import UpdateUser from './components/Update/User';
import CreateUser from './components/Create/User';
import { Button } from '@material-ui/core';
import { Fab, Menu, MenuItem } from '@material-ui/core';
import UpdateRole from './components/Update/Role';
import UpdateAnimeComplex from './components/Update/AnimeComplex';

function App() {
  //for dropdown catalog
  const [anchorElCatalog, setAnchorElCatalog] = useState(null);

  const handleClickCatalog = (event) => {
    setAnchorElCatalog(event.currentTarget);
  };

  const handleCloseCatalog = () => {
    setAnchorElCatalog(null);
  };
  //

    //for dropdown administration
    const [anchorElAdministration, setAnchorElAdministration] = useState(null);

    const handleClickAdministration = (event) => {
      setAnchorElAdministration(event.currentTarget);
    };
  
    const handleCloseAdministration = () => {
      setAnchorElAdministration(null);
    };
    //

  return (
    <Router>
      <div className="app">
          <div className="menu">
            <span className="menuBlock" />
            <span className="menuLine" />
            <div className="menuLinks">
            <Link className="homeMenuLink" to="/" />
              <Button color="inherit" onClick={handleClickCatalog}>
                Catalog
              </Button>
              <Menu
              anchorEl={anchorElCatalog}
              className="sortDropdown"
              keepMounted={false}
              open={Boolean(anchorElCatalog)}
              onClose={handleCloseCatalog}
            >
              <MenuItem className="sortDropdownItem"><Link className="menuLink" to="/catalog/anime">Anime</Link></MenuItem>
              <MenuItem className="sortDropdownItem"><Link className="menuLink" to="/catalog/anime-complex">Anime complexes</Link></MenuItem>
            </Menu>

            <Button color="inherit" onClick={handleClickAdministration}>
                Administration
              </Button>
              <Menu
              anchorEl={anchorElAdministration}
              className="sortDropdown"
              keepMounted={false}
              open={Boolean(anchorElAdministration)}
              onClose={handleCloseAdministration}
            >
              <MenuItem className="sortDropdownItem"><Link className="menuLink" to="/administration/users">Users</Link></MenuItem>
              <MenuItem className="sortDropdownItem"><Link className="menuLink" to="/administration/roles">Roles</Link></MenuItem>
            </Menu>
            </div>  
          </div>
        <div className="body">
          <Switch>
            <Route path="/catalog/anime/create">
              <CreateAnime />
            </Route>
            <Route path="/administration/user/create">
              <CreateUser />
            </Route>
            <Route path="/administration/role/create">
              <CreateRole />
            </Route>
            <Route path="/catalog/anime-complex/create">
              <CreateAnimeComplex />
            </Route>
            <Route path="/catalog/anime/update">
              <UpdateAnime />
            </Route>
            <Route path="/administration/user/update">
              <UpdateUser />
            </Route>
            <Route path="/administration/role/update">
              <UpdateRole />
            </Route>
            <Route path="/catalog/anime-complex/update">
              <UpdateAnimeComplex />
            </Route>
            <Route path="/catalog/anime">
              <Anime />
            </Route>
            <Route path="/catalog/anime-complex">
              <AnimeComplex />
            </Route>
            <Route path="/administration/users">
              <Users />
            </Route>
            <Route path="/administration/roles">
              <Roles />
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
