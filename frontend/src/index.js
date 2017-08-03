import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { syncHistoryWithStore } from 'react-router-redux';

import ConfigureStore from './store/configureStore';

import App from './App';
import DeleteDbContainer from './DeleteDbContainer';
import {BookingContainer} from './BookingContainer';
import { } from 'bootstrap/dist/css/bootstrap.css';
import { } from 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

let configureStore = new ConfigureStore();
let store = configureStore.store;

// const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/deletedb" component={DeleteDbContainer} />
        <Route path="/booking" component={BookingContainer} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
