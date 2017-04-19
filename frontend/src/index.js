import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router } from 'react-router-dom';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { syncHistoryWithStore } from 'react-router-redux';


import rootReducer from './store/reducers';
import initialLoad from './store/actions';

import App from './App';
import DeleteDbContainer from './DeleteDbContainer';
import BookingPage from './BookingPage';
import { } from 'bootstrap/dist/css/bootstrap.css';
import { } from 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

const loggerMiddleware = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
// const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(initialLoad());

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/deletedb" component={DeleteDbContainer} />
        {/*<Route path="/booking" component={BookingPage} routeService={routeService} bookingService={bookingService} roomRepo={roomRepo} />*/}
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
