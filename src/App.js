import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

//Components
import './App.css';
import LoginForm from './containers/login-page/login-form'
import ClientHome from './containers/client-home/client-home'
import ClientClients from './containers/client-clients/client-clients'
import ClientSettings from './containers/client-settings/client-settings'
import NavbarClient from './components/navbar-client'


class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      username: null,
    };

  }
  render() {
    
    return (
      <div className="App">
        <NavbarClient/>
        <Route exact path="/" component={ClientHome} />
        <Route exact path="/clients" component={ClientClients} />
        <Route exact path="/ajustes" component={ClientSettings} />
        <Route exact path="/login" component={LoginForm} />
      </div>
    );
  }
}

export default App;
