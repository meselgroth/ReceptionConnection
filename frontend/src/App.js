import React, { Component } from 'react';
import { Link } from 'react-router';
import AvailabilityTable from './AvailabilityTable';
import {Button} from 'react-bootstrap';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.bookingService = props.route.bookingService;
    this.roomRepo = props.route.roomRepo;
  }
  render() {
    return (
      <div>
          <h1>Chill Out Room Layout<Link to="/booking" className='pull-right'><Button bsStyle="primary">Add Booking</Button></Link></h1>
        <AvailabilityTable bookingService={this.bookingService} roomRepo={this.roomRepo} />
        
      </div>
    );
  }
}
