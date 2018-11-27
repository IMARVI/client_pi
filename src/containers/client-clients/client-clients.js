import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './client-clients.css'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import { connect } from 'react-redux'
import axios from 'axios';
import { Button, FormGroup, FormControl, Form, ControlLabel, Modal } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
//import Modal from 'react-modal';


class ClientClients extends Component {
  constructor() {
    super();
    this.state = {
      newRFC: "",
      llave: "",
      valor: "",
      accepted: [],
      rejected: [],
      waiting: [],
      usuariosRFC: [],
      usuarios: [],
      show: false,
      currentRFC: ""
    };

    this.options = {
      defaultSortName: 'nombres',  // default sort column name
      defaultSortOrder: 'curp',  // default sort order
      onRowClick: this.openModal.bind(this)
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHide = this.handleHide.bind(this);
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
            newRFC: "RFC No existe"
          })

        }
      })
      .catch(error => {
        console.log("No se encontro el usuario")
        console.error(error);
      });
  }

  handleDatos(event) {
    event.preventDefault();
    let aux = {}
    aux[this.state.llave] = this.state.valor
    const datos = {
      client: this.props.datosUsr,
      company: this.props.usr,
      data: aux,
      header: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    }
    console.log(datos)
    axios.post('https://el-equipo-perro.mybluemix.net/company/register/data', datos)
      .then(response => {
        console.log(response)
        if (response.data.status === 200) {
          console.log("datos guardados")
          this.handleHide()
        }
        else if (response.data.status === 400) {
          console.log("datos NO guardados")
          this.handleHide()
        }
      })
      .catch(error => {
        console.log("No se encontro el usuario")
        console.error(error);
      });
  }

  openModal(row) {
    this.setState({
      show: true,
      currentRFC: row.rfc
    })
    this.props.setUsuarioDatos(row.rfc)
  }

  handleHide() {
    this.setState({
      show: false,
      currentRFC: ""
    });
  }


  render() {
    //console.log(this.state)
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


          <Modal
            animation
            show={this.state.show}
            onHide={this.handleHide}
            container={this}
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title">
                Agregar Datos
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form horizontal="true" >
                <FormGroup>
                  <ControlLabel>Ingresar llave/valor</ControlLabel>
                  <FormControl
                    name="llave"
                    type="text"
                    placeholder="llave"
                    value={this.state.llave}
                    onChange={this.handleChange}
                  />
                  <FormControl
                    name="valor"
                    type="text"
                    placeholder="valor"
                    value={this.state.valor}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Modal.Footer>
                  <Button
                    type="submit"
                    onClick={(event) => this.handleDatos(event)}>
                    Agregar
              </Button>
                </Modal.Footer>
              </form>
            </Modal.Body>
          </Modal>

          <div className='workspace' >
            <BootstrapTable data={this.props.usuarios} pagination options={this.options} onChange={this.handleChange}>
              <TableHeaderColumn dataField='nombres' dataSort>Nombre</TableHeaderColumn>
              <TableHeaderColumn dataField='rfc' isKey dataSort> RFC</TableHeaderColumn>
              <TableHeaderColumn dataField='edad' dataSort filter={{ type: 'TextFilter', delay: 100 }}>Edad</TableHeaderColumn>
              <TableHeaderColumn dataField='telefono'>Telefono</TableHeaderColumn>
              <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
              <TableHeaderColumn dataField='permiso' dataSort filter={{ type: 'TextFilter', delay: 100 }}>Permiso</TableHeaderColumn>
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
    usuarios: state.usuariosTodos,
    datosUsr: state.usrdatos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUsuarioDatos: (rfc) => dispatch({ type: 'SET_DATOS', usrdatos: rfc }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientClients);