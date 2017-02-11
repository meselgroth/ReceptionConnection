import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import RouteService from './services/RouteService';
import App from './App';
import AvailabilityPage from './AvailabilityPage';
import BookingPage from './BookingPage';
import './index.css';

const routeService = new RouteService();

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/availability" component={AvailabilityPage} />
    <Route path="/booking" component={BookingPage} routeService={routeService} />
  </Router>,
  document.getElementById('root')
);
