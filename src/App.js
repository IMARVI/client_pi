import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

//Components
import './App.css';
import LoginForm from './containers/login-page/login-form'
import ClientHome from './containers/client-home/client-home'
import ClientClients from './containers/client-clients/client-clients'
import ClientSettings from './containers/client-settings/client-settings'
import ClientRegister from './containers/client-register/client-register'

import NavbarClient from './components/navbar-client'

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      redirectTo: null,
    };
    this.updateUser = this.updateUser.bind(this);
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  render() {
    return (
      <div className="App">
        <NavbarClient updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Switch>
          <Route path="/" exact render={() => <LoginForm updateUser={this.updateUser} />} />
          <Route path="/home" component={ClientHome} />
          <Route path="/clients" component={ClientClients} />
          <Route path="/ajustes" component={ClientSettings} />
          <Route path="/register" component={ClientRegister} />
        </Switch> 
      </div>
    );
  }

}

export default App;
