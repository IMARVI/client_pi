import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './client-clients.css'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { connect } from 'react-redux'
import axios from 'axios';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

class ClientClients extends Component {
  constructor() {
    super();
    this.state = {
      newRFC: "",
      accepted: [],
      rejected: [],
      waiting: [],
      usuariosRFC: [],
      usuarios: []
    };

    this.options = {
      defaultSortName: 'nombres',  // default sort column name
      defaultSortOrder: 'curp'  // default sort order
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const datos = {
      client: this.state.newRFC,
      company: this.props.usr,
      header: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
    axios.post('https://el-equipo-perro.mybluemix.net/company/request/access', datos)
      .then(response => {
        console.log(response)
        if (response.data.status === 200) {
          console.log("Peticion exitosa!")
          this.setState({
            newRFC: "Peticion enviada!"
          })
        }
        else if (response.data.status === 400) {
          this.setState({
            newRFC: "Ocurrio un error"
          })

        }
      })
      .catch(error => {
        console.log("No se encontro el usuario")
        console.error(error);
      });
  }


  render() {
    if (this.props.logged) {
      return (
        <div>
          <Form className="formc" >
            <FormGroup >
              <FormControl
                name="newRFC"
                type="text"
                placeholder="RFC"
                value={this.state.newRFC}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button
              className="botonc"
              type="submit"
              onClick={this.handleSubmit}>
              Invitar
                    </Button>
          </Form>
          <div className='workspace' >
            <BootstrapTable data={this.props.usuarios} options={this.options} onChange={this.handleChange}>
              <TableHeaderColumn dataField='nombres' dataSort>Nombre</TableHeaderColumn>
              <TableHeaderColumn dataField='rfc' isKey dataSort> RFC</TableHeaderColumn>
              <TableHeaderColumn dataField='edad' dataSort filter={ { type: 'TextFilter', delay: 100 } }>Edad</TableHeaderColumn>
              <TableHeaderColumn dataField='telefono'>Telefono</TableHeaderColumn>
              <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
              <TableHeaderColumn dataField='permiso' dataSort filter={ { type: 'TextFilter', delay: 100 } }>Permiso</TableHeaderColumn>
            </BootstrapTable>
          </div>
        </div>
      );
    } else {
      return <Redirect to={{ pathname: '/' }} />
    }
  }
}

//Con este metodo mandamos a llamar los valores que hay en redux
const mapStateToProps = state => {
  return {
    usr: state.user,
    logged: state.logged,
    usuarios: state.usuariosTodos
  };
};

export default connect(mapStateToProps)(ClientClients);