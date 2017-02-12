import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import RouteService from './services/RouteService';
import BookingRepo from './services/BookingRepo';
import BookingService from './services/BookingService';
import App from './App';
import AvailabilityPage from './AvailabilityPage';
import BookingPage from './BookingPage';
import './index.css';

const routeService = new RouteService();
const bookingRepo = new BookingRepo();
const bookingService = new BookingService(bookingRepo);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="/availability" component={AvailabilityPage} />
    <Route path="/booking" component={BookingPage} routeService={routeService} bookingService={bookingService}/>
  </Router>,
  document.getElementById('root')
);
