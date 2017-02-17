import React, { Component } from 'react';
import { Link } from 'react-router';
import AvailabilityTable from './AvailabilityTable';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.bookingService = props.route.bookingService;
    this.roomRepo = props.route.roomRepo;
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Chill Out Reception</h2>
        </div>
        <AvailabilityTable bookingService={this.bookingService} roomRepo={this.roomRepo} />
        <p className="App-intro">
          <Link to="/booking">Walk In</Link>
        </p>
      </div>
    );
  }
}
