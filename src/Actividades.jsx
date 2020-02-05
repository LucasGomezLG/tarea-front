import React from 'react';
import logo from './logo.svg';
import './App.css';
import API from './service/api.js';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tarea: {
                actividades: []
            },
            username: ''
        }

    }

    componentDidMount() {

        API.get(`/tarea/${this.props.location.state.idTarea}`).then((res) => this.setState({ tarea: res }))
            .catch((e) => console.log(e))

        this.setState( {username: this.props.location.state.username} )

    }

    volver() {

        this.props.history.push({

            pathname: '/home',
            state: {
            username: this.state.username
            }
        });

    }

    renderActividades() {

        return (this.state.tarea.actividades.map((actividad) => this.listarActividades(actividad)))

    }

    listarActividades(actividad) {

if(actividad.completa === true){

    return (

        <div key={actividad.id}>

            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="defaultUnchecked" />
                <label className="custom-control-label">{actividad.descripcion}</label>
            </div>

        </div>


    );

}else{

    return (

        <div key={actividad.id}>

            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="defaultUnchecked" />
                <label className="custom-control-label">{actividad.descripcion}</label>
            </div>

        </div>


    );

}
      

    }

    render() {

        return (

            <div className="container App">
                <div className="row">
                    <div className="App-header" >

                        <div className="col">

                            <img src={logo} className="App-logo" alt="logo" />
                            <p>Actividades</p>

                        </div>
                    </div>

                    <div className="col">
                        <div>
                            <h1 className="text-center"> {this.state.tarea.nombre} </h1>
                        </div>
                        <div>
                            <h3 className="text-center"> {this.state.tarea.descripcion} </h3>
                        </div>


                        <div>
                            {this.renderActividades()}
                        </div>

                        <button className="boton btn btn-primary buttonSes"
                            onClick={() => this.volver()}> Volver </button>


                    </div>


                </div>
            </div>

        );
    }

}

export default Login;