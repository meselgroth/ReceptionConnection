import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import RouteService from './services/RouteService';
import BookingRepo from './services/BookingRepo';
import RoomRepo from './services/RoomRepo';
import BookingService from './services/BookingService';
import App from './App';
import BookingPage from './BookingPage';
import './index.css';

const routeService = new RouteService();
const bookingRepo = new BookingRepo();
const roomRepo = new RoomRepo();
const bookingService = new BookingService(bookingRepo);

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App} routeService={routeService} bookingService={bookingService} roomRepo={roomRepo} />
    <Route path="/booking" component={BookingPage} routeService={routeService} bookingService={bookingService}/>
  </Router>,
  document.getElementById('root')
);
