import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Image } from 'react-bootstrap'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import image from '../../recursos/imagenes/profile.png'


class ClientSettings extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            redirectTo: null,
            datosUs:{
                nombre: "Isaias Martinez V",
                permisos: "Administrador",
                password: "***********",
                login: "10-09-2018"
            },
            data: [{
                nombre: "Isaias",
                permiso: "Administrador",
                telefono: 7717955156,
            }, 
            {
                nombre: "Isaac Yael",
                permiso: "Supervisor",
                telefono: 5518872663
            },
            {
                nombre: "Hector Flores",
                permiso: "Administrador",
                telefono: 7118985321
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
                
                    <div className='datosUsr'>
                        <Image src={image} width='200px' responsive />
                    </div>

                    <div className= 'datosUsr'>
                        <p>Nombre: {this.state.datosUs.nombre}</p>
                        <p>Permisos: {this.state.datosUs.permisos}</p>
                        <p>Password: {this.state.datosUs.password}</p>
                        <p>Last-login: {this.state.datosUs.login}</p>
                    </div>

                    <BootstrapTable data={this.state.data} options={this.options}>
                        <TableHeaderColumn dataField='nombre' dataSort>Nombre</TableHeaderColumn>
                        <TableHeaderColumn dataField='permiso' isKey dataSort> Permiso</TableHeaderColumn>
                        <TableHeaderColumn dataField='telefono'>Telefono</TableHeaderColumn>
                        <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        );
    }
}
export default ClientSettings;