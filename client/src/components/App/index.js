import React, { Component } from 'react';
import  { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../Home';

import './index.css';


class App extends Component {
  render() {
    return (
      <Router>
          <div className="App">
            <Route path='/auth/login' component={() => window.location = '/auth/login'} />
            <Route exact path="/" component={Home} />
          </div>
      </Router>
    );
  }
}

export default App;
