import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './client-clients.css'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

class ClientClients extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            redirectTo: null,
            data: 
            [{
                nombre: "Isaias",
                curp: "MAVI910921",
                nacimiento: "21-09-1991",
                domicilio: "Santa Fe",
                telefono: "7717955156",
                email: "isaiasmarvi@gmail.com",
                permiso: "true"
            }, 
            {
                nombre: "Isaac Yael",
                curp: "YACA0902112",
                nacimiento: "09-03-1996"
            },
            {
                nombre: "Hector Flores",
                curp: "FLOR0902112",
                nacimiento: "09-03-1996"
            }
            ],
        };

        this.options = {
            defaultSortName: 'nombre',  // default sort column name
            defaultSortOrder: 'curp'  // default sort order
      };


    }


    render() {
        return (
            <div>

                <div className='workspace' >
                    <BootstrapTable data={this.state.data} options={this.options}>
                        <TableHeaderColumn dataField='nombre'  dataSort>Nombre</TableHeaderColumn>
                        <TableHeaderColumn dataField='curp' isKey dataSort> CURP</TableHeaderColumn>
                        <TableHeaderColumn dataField='nacimiento' dataSort>Fecha Nacimiento</TableHeaderColumn>
                        <TableHeaderColumn dataField='domicilio'>Domicilio</TableHeaderColumn>
                        <TableHeaderColumn dataField='telefono'>Telefono</TableHeaderColumn>
                        <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                        <TableHeaderColumn dataField='permiso' dataSort>Permiso</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
}
export default ClientClients;