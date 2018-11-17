import React, { Component } from 'react';
import axios from 'axios';
import { Nav,Navbar,NavItem} from "react-bootstrap";
import { Link } from 'react-router-dom';
import "./navbar-client.css";


class NavbarClient extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log('logging out');
    this.props.updateUser({
      loggedIn: false,
      username: null,
      redirectTo: null
    });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ');
    console.log(this.props);
    return (
      <div>
        {loggedIn ? (
        <Navbar className= 'clientNav' >
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/home">
                Logo
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav className='styleNav'>
              <NavItem eventKey={1} href="#" className='itesmNav' >
                <Link to="/home" >
                  Dashboard
                </Link>
              </NavItem>
              <NavItem eventKey={2} href="#" className='itesmNav' >
                <Link to="/clients" >
                  Clients
                </Link>
              </NavItem>
              <NavItem eventKey={3} href="#" className='itesmNav' >
                <Link to="/ajustes" >
                  Ajustes
                </Link>
              </NavItem>
            </Nav>
            <Nav pullRight='true' >
              <NavItem eventKey={4} href="#" >
                <Link to="/" onClick={this.logout}>
                  Logout
                </Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        ):(
          <div></div>
        )}
      </div>
    );
  }
}

export default NavbarClient;