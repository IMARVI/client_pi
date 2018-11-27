import React, { Component } from "react";
import {
  Radar, RadarChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, BarChart,
  Bar, Pie, PieChart, Scatter, ScatterChart, Cell
} from 'recharts';
import './client-home.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { ApiService } from "../../components/ApiServices";
import { isString } from "util";



class ClientHome extends Component {
  constructor() {
    super();
    this.state = {
      newRFC: "",
      accepted: [],
      datos: {},
      waiting: [],
      usuariosRFC: [],
      usuarios: [],
      COLORS: ['#2eb82e', '#FF8000', '#FF8042'],
      RADIAN: Math.PI / 180,
      d: [],
      d1: [],
      d3: [],
      d4: []
    };
    this.apiService = new ApiService();
  }

  cargarUsuarios() {
    this.apiService.get({
      url: "/company/" + this.props.usr + "/clients",
    }).then(response => {
      if (response.status === 200) {
        const ac = response.payload.allowed;
        const wa = response.payload.waiting;
        this.setState({
          accepted: ac,
          waiting: wa,
          usuariosRFC: ac.concat(wa)
        });
        this.calcularDatos()
        this.calularCantidadEdad()
        this.calcularStatus()
        this.calcularAceptacionTiempo()
        this.parsearUsuarios()
      }
    })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    if (this.props.usr) {
      this.cargarUsuarios()
    }
  }

  //---------------------------------------------------------- Logica BI
  parsearUsuarios(){
    let x = []
    for(var usr in this.state.accepted){
      x.push(this.state.accepted[usr]['client'])
    }
    this.props.setUsuarios(x)
  }

  calularCantidadEdad() {
    let uno = 0, dos = 0, tres = 0, cuatro = 0, cinco = 0, seis = 0, siete = 0, ocho = 0, nueve = 0, diez = 0;
    for (var x in this.state.accepted) {
      const edad = parseInt(this.state.accepted[x]['client'].edad, 10);
      if (edad < 20) {
        uno += 1
      }
      else if (edad < 30) {
        dos += 1
      } else if (edad < 40) {
        tres += 1
      } else if (edad < 50) {
        cuatro += 1
      } else if (edad < 60) {
        cinco += 1
      } else if (edad < 70) {
        seis += 1
      } else if (edad < 80) {
        siete += 1
      } else if (edad < 90) {
        ocho += 1
      } else if (edad < 100) {
        nueve += 1
      }
    }
    this.setState(
      {
        d4: [
          { x: 10, y: uno },
          { x: 20, y: dos },
          { x: 30, y: tres },
          { x: 40, y: cuatro },
          { x: 50, y: cinco },
          { x: 60, y: seis },
          { x: 70, y: siete },
          { x: 80, y: ocho },
          { x: 90, y: nueve },
          { x: 100, y: diez }]
      }
    )

  }

  calcularStatus() {
    this.setState(
      {
        d3: [
          { name: 'Aceptados', value: this.state.accepted.length },
          { name: 'Esperando', value: this.state.waiting.length }
        ]
      }
    )
  }

  calcularAceptacionTiempo() {
    let ene = 0, feb = 0, mar = 0, abr = 0, may = 0, jun = 0, jul = 0, ago = 0, sep = 0, oct = 0, nov = 0, dic = 0;
    let ene2 = 0, feb2 = 0, mar2 = 0, abr2 = 0, may2 = 0, jun2 = 0, jul2 = 0, ago2 = 0, sep2 = 0, oct2 = 0, nov2 = 0, dic2 = 0;
    // guardamos los usuarios por mes
    //{ name: 'Mes 1', Creados: 4000, Aceptados: 2400, amt: 2400 }
    for (var x in this.state.usuariosRFC) {
      let fechaCreacion = this.state.usuariosRFC[x]['created']
      let fechaModif = this.state.usuariosRFC[x]['client']

      let mesCreacion = new Date(fechaCreacion).getMonth()
      let mesModif = -1

      if ( !isString(fechaModif)) {
        mesModif = new Date(fechaCreacion).getMonth()
      }
      //poblamos el arreglo de fechas nuevas
      if (mesCreacion === 0) { ene += 1 }
      else if (mesCreacion === 1) { feb += 1 }
      else if (mesCreacion === 2) { mar += 1 }
      else if (mesCreacion === 3) { abr += 1 }
      else if (mesCreacion === 4) { may += 1 }
      else if (mesCreacion === 5) { jun += 1 }
      else if (mesCreacion === 6) { jul += 1 }
      else if (mesCreacion === 7) { ago += 1 }
      else if (mesCreacion === 8) { sep += 1 }
      else if (mesCreacion === 9) { oct += 1 }
      else if (mesCreacion === 10) { nov += 1 }
      else if (mesCreacion === 11) { dic += 1 }

      if (mesModif === 0) { ene2 += 1 }
      else if (mesModif === 1) { feb2 += 1 }
      else if (mesModif === 2) { mar2 += 1 }
      else if (mesModif === 3) { abr2 += 1 }
      else if (mesModif === 4) { may2 += 1 }
      else if (mesModif === 5) { jun2 += 1 }
      else if (mesModif === 6) { jul2 += 1 }
      else if (mesModif === 7) { ago2 += 1 }
      else if (mesModif === 8) { sep2 += 1 }
      else if (mesModif === 9) { oct2 += 1 }
      else if (mesModif === 10) { nov2 += 1 }
      else if (mesModif === 11) { dic2 += 1 }
    }
    this.setState({
      d: [
        { name: 'Ene', Aceptados: ene2, Creados: ene },
        { name: 'Feb', Aceptados: feb2, Creados: feb },
        { name: 'Mar', Aceptados: mar2, Creados: mar },
        { name: 'Abr', Aceptados: abr2, Creados: abr },
        { name: 'May', Aceptados: may2, Creados: may },
        { name: 'Jun', Aceptados: jun2, Creados: jun },
        { name: 'Jul', Aceptados: jul2, Creados: jul },
        { name: 'Ago', Aceptados: ago2, Creados: ago },
        { name: 'Sep', Aceptados: sep2, Creados: sep },
        { name: 'Oct', Aceptados: oct2, Creados: oct },
        { name: 'Nov', Aceptados: nov2, Creados: nov },
        { name: 'Dic', Aceptados: dic2, Creados: dic }
      ]
    })
    this.generarProductos()
  }

  calcularDatos() {
    let datos = {}
    for (var usr in this.state.accepted) {
      if (this.state.accepted[usr]['client'] !== undefined) {
        if (datos[this.state.accepted[usr]['client'].terceros[this.props.usr]['producto']] === undefined) {
          datos[this.state.accepted[usr]['client'].terceros[this.props.usr]['producto']] = 1
        } else {
          let aux = datos[this.state.accepted[usr]['client'].terceros[this.props.usr]['producto']]
          aux += 1
          datos[this.state.accepted[usr]['client'].terceros[this.props.usr]['producto']] = aux
        }
      }
    }
    this.setState({
      datos: datos
    })
  }

  generarProductos() {
    let datos = this.state.datos
    let aux = []
    for (var key in datos) {
      let obj = {
        producto: key,
        A: datos[key]
      }

      aux.push(obj)
    }
    this.setState({
      d1: aux
    })
  }

  //---------------------------------------------------------- Logica BI



  render() {
    console.log(this.state)
    console.log(this.props)
    if (this.props.logged) {
      return (
        <div>
          <div className='workspace' >
            <div className="graficas">
              <ResponsiveContainer minWidth={300} minHeight={300} width="100%" height={300}>
                <RadarChart outerRadius={130} data={this.state.d1}>
                  <Tooltip />
                  <PolarGrid />
                  <PolarAngleAxis dataKey="producto" />
                  <PolarRadiusAxis angle={90} />
                  <Radar name="Productos" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="graficas">
              <ResponsiveContainer minWidth={300} minHeight={300} width="100%" height={300}>
                <BarChart data={this.state.d}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Creados" fill="#82ca9d" />
                  <Bar dataKey="Aceptados" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="graficas">
              <ResponsiveContainer minWidth={300} minHeight={300} width="100%" height={300}>
                <PieChart >
                  <Pie
                    data={this.state.d3}
                    dataKey='value'
                    labelLine={true}
                    label
                    outerRadius={130}
                    fill="#8884d8"
                  >
                    {
                      this.state.d3.map((entry, index) =>
                        <Cell key={index} fill={this.state.COLORS[index % this.state.COLORS.length]} />)
                    }
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="graficas">
              <ResponsiveContainer minWidth={300} minHeight={300} width="100%" height={300}>
                <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis dataKey={'x'} type="number" name='Edad' />
                  <YAxis dataKey={'y'} type="number" name='Total' />
                  <Scatter name='A school' data={this.state.d4} fill='#8884d8' />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      );
    }
    else {
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

const mapDispatchToProps = dispatch => {
  return {
    setUsuarios: (users) => dispatch({ type: 'SET_USUARIOS', usuariosTodos: users }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientHome);