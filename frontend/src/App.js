import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Chill Out Reception</h2>
        </div>
        <p className="App-intro">
          <Link to="/booking">Walk In</Link>
        </p>
      </div>
    );
  }
}

export default App;
