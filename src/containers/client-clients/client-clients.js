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

  cargarUsuarios() {
    axios.get('http://el-equipo-perro.mybluemix.net/company/' + this.props.usr + '/clients')
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          const ac = response.data.payload.accepted
          const re = response.data.payload.rejected
          const wa = response.data.payload.waiting
          this.setState({
            accepted: ac,
            rejected: re,
            waiting: wa
          })
          this.setState({
            usuariosRFC: ac.concat(re, wa)
          })
          console.log(this.state)
          this.mapearUsuarios()
        }
      })
      .catch(error => {
        console.log("Algo ocurrio en la llamada de buscar usuarios")
        console.error(error);
      });
  }

  mapearUsuarios() {
    console.log("Dentro de mapear ususaro")
    for (var usr in this.state.usuariosRFC) {
      axios.get('http://el-equipo-perro.mybluemix.net/client/' + this.state.usuariosRFC[usr])
        .then(response => {
          console.log(response.data.payload)
          if (response.status === 200) {
            //agregamos el estatus al ususario
            //console.log(this.state.accepted)
            //console.log(this.state.waiting.indexOf(response.data.payload['rfc']))

            if (this.state.accepted.indexOf(response.data.payload['rfc']) >= 0) {
              response.data.payload['permiso'] = "aprobado"
            }
            else if (this.state.waiting.indexOf(response.data.payload['rfc']) >= 0) {
              response.data.payload['permiso'] = "Esperando"
            }
            else if (this.state.rejected.indexOf(response.data.payload['rfc']) >= 0) {
              response.data.payload['permiso'] = "Denegado"
            }

            //Cargamos al estado con los nuevos valores
            const aux = this.state.usuarios.slice()
            aux.push(response.data.payload)
            this.setState({
              usuarios: aux
            })
          }
        })
        .catch(error => {
          console.log("Algo ocurrio en la llamada de buscar usuarios")
          console.error(error);
        });
    }
  }

  componentDidMount() {
    //Aqui mandamos a cargar el estado desde redux
    this.cargarUsuarios()
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
    axios.post('http://el-equipo-perro.mybluemix.net/company/request/access', datos)
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
            newRFC: "RFC No existe!"
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
            <BootstrapTable data={this.state.usuarios} options={this.options} onChange={this.handleChange}>
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
    logged: state.logged
  };
};
export default connect(mapStateToProps)(ClientClients);