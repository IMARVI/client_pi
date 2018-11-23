import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, FormGroup, FormControl } from "react-bootstrap";

class ClientRegister extends Component {
  constructor() {
    super();
    this.state = {
      rfc: '',
      password: '',
      redirectTo: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Metodo para hacer el double binding
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const datos = {
      id: this.state.rfc,
      company: {
        user: this.state.rfc,
        password: this.state.password
      },
      header: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }

    axios.post('https://el-equipo-perro.mybluemix.net/company/register', datos)
      .then(response => {
        console.log(response.data)
        if (response.data.status === 200) {
          this.setState({
            redirectTo: '/'
          })
        }
        else {
          this.setState({
            rfc: '',
            password: ''
          })
        }
      })
      .catch(error => {
        console.log("No se encontro el usuario")
        console.error(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      console.log("A punto de redirigir")
      return <Redirect to={{ pathname: '/'}} />;
    } else {
      return (
        <div className="login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="rfc" className="form-group" >
              <FormControl
                name="rfc"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="RFC Empresa"
                className="box"
              />
            </FormGroup>
            <FormGroup controlId="password">
              <FormControl
                name="password"
                className="box"
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
                placeholder="Contraseña"
              />
            </FormGroup>

            <Button
              className="boton"
              bsStyle="primary"
              bsSize="large"
              type="submit"
              onClick={this.handleSubmit}
            >
              Registrar Empresa
          </Button>
          </form>
        </div>
      );
    }
  }
}

export default ClientRegister;