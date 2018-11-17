import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./login-form.css";
import { connect } from 'react-redux'

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      redirectTo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const datos = {
      user: this.state.email,
      password : this.state.password,
      header:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type' : 'application/json'
      }
    }
    axios.post('http://el-equipo-perro.mybluemix.net/company/login',datos)
      .then(response => {
        if(response.data.payload === true){
          this.props.updateUser({
            loggedIn: true,
            username: this.state.email,
          });
          this.props.
          this.setState({
            redirectTo: '/home',
          });
        }
      })
      .catch(error => {
        console.log("No se encontro el usuario")
        console.error(error);
      });
  }

  
  render() {
    console.log("Desde login")
    console.log(this.state)
    console.log(this.props)
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo, state: this.state }} />;
    } else {
    return (

      <div className="login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" className = "form-group" >
            <FormControl
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder = "Correo"
              className="box"
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormControl
              name="password"
              className = "box"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Contraseña"
            />
          </FormGroup>

          <Button
            className = "boton"
            bsStyle="primary"
            bsSize="large"
            type="submit"
            onClick={this.handleSubmit}
          >
            Iniciar Sesión
          </Button>
        </form>
        <Button>
            Registrarse
        </Button>
      </div>
    );
  }
  }
}

const mapStateToProps = state => {
  return {
    usr:state.user
  };
};

const mapDispatchToProps = dispatch =>{
  return {
    setUser : () => dispatch({type: 'SET_USR', usr : this.state.user})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);