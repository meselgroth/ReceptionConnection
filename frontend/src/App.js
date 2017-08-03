import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AvailabilityTableContainer from './AvailabilityTableContainer';
import {Button} from 'react-bootstrap';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div>
          <h1>Layout<Link to="/booking" className='pull-right'><Button bsStyle="primary">Add Booking</Button></Link></h1>
        <AvailabilityTableContainer  />
        
      </div>
    );
  }
}
