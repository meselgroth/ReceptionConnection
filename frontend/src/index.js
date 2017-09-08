import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import ConfigureStore from './store/configureStore';

import App from './App';
import DeleteDbContainer from './DeleteDbContainer';
import { BookingContainer } from './BookingContainer';
import { Navbar, NavDropdown, NavItem, Nav, MenuItem, NavbarBrand, NavbarCollapse } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import { } from 'bootstrap/dist/css/bootstrap.css';
import { } from 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

let configureStore = new ConfigureStore();
let store = configureStore.store;

ReactDOM.render(
  <Provider store={store}>

    <Router>

      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <h1>Chillout Bed Layout</h1>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#"><Link to="/booking"><Button bsStyle="primary">Add Booking</Button></Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className="main">
          <Route path="/" component={App} />
          <Route path="/deletedb" component={DeleteDbContainer} />
          <Route path="/booking" component={BookingContainer} />
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
