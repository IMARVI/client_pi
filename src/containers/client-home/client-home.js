import React, { Component } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, BarChart,
    Bar, Radar, RadarChart, PolarAngleAxis, PolarGrid,
    PolarRadiusAxis, Scatter,ScatterChart, ZAxis
} from 'recharts';
import './client-home.css'

class ClientHome extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            redirectTo: null,
            d: [
                { name: 'Mes 1', uv: 4000, pv: 2400, amt: 2400 },
                { name: 'Mes 2', uv: 3000, pv: 1398, amt: 2210 },
                { name: 'Mes 3', uv: 2000, pv: 9800, amt: 2290 },
                { name: 'Mes 4', uv: 2780, pv: 3908, amt: 2000 },
                { name: 'Mes 5', uv: 1890, pv: 4800, amt: 2181 },
                { name: 'Mes 6', uv: 2390, pv: 3800, amt: 2500 },
                { name: 'Mes 7', uv: 3490, pv: 4300, amt: 2100 },
            ],
            d2 : [
                { subject: 'Math', A: 120, B: 110, fullMark: 150 },
                { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
                { subject: 'English', A: 86, B: 130, fullMark: 150 },
                { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
                { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
                { subject: 'History', A: 65, B: 85, fullMark: 150 },
                { subject: 'Computer', A: 120, B: 110, fullMark: 150 },
            ],
            d3 : [{x: 100, y: 200, z: 200}, {x: 120, y: 100, z: 260},
                {x: 170, y: 300, z: 400}, {x: 140, y: 250, z: 280},
                {x: 150, y: 400, z: 500}, {x: 110, y: 280, z: 200}],

            d4 : [{x: 200, y: 260, z: 240}, {x: 240, y: 290, z: 220},
                {x: 190, y: 290, z: 250}, {x: 198, y: 250, z: 210},
                {x: 180, y: 280, z: 260}, {x: 210, y: 220, z: 230}],
        };

    }



    render() {
        return (
            <div>
                <div className='workspace' >
                    <div className="graficas">
                        <ResponsiveContainer minWidth={300} minHeight={300} width="100%" height={300}>
                            <LineChart data={this.state.d}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="graficas">
                        <ResponsiveContainer minWidth={300} minHeight={300} width="100%" height={300}>
                            <BarChart data={this.state.d}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="pv" fill="#8884d8" />
                                <Bar dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="graficas">
                        <ResponsiveContainer minWidth={300} minHeight={300} width="100%" height={300}>
                            <RadarChart outerRadius={90} data={this.state.d2}>
                                <PolarGrid />
                                <PolarAngleAxis dataKey="subject" />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                                <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="graficas">
                        <ResponsiveContainer minWidth={300} minHeight={300} width="100%" height={300}>
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" name="stature" unit="cm" />
                                <YAxis dataKey="y" name="weight" unit="kg" />
                                <ZAxis dataKey="z" range={[64, 144]} name="score" unit="km" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Legend />
                                <Scatter name="A school" data={this.state.d3} fill="#8884d8" />
                                <Scatter name="B school" data={this.state.d4} fill="#82ca9d" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}
export default ClientHome;