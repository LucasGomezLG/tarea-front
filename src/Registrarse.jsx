import React from 'react';
import logo from './logo.svg';
import './App.css';
import API from './service/api';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }

    }


    emailLog(e) {

        this.setState({ username: e.target.value })

    }

    passLog(e) {

        this.setState({ password: e.target.value })

    }

    goToHome(res) {

        this.props.history.push({

            pathname: '/',
            state: res,

        });



    }

    registrarSesion(){

        const body = this.state;

        API.post('/signup', body).then((res) => this.goToHome(res))
            .catch((e) => console.log(e))


    }

    volver(){

        this.props.history.push({

            pathname: '/'

        });

    }

    formRegist() {

        return (
            <div className="formLog">
                <div className="input-group form-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                    <input type="email" className="form-control" placeholder="Email" onChange={(e) => this.emailLog(e)} />
                </div>
                <div className="input-group form-group formLog1">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                    <input type="password" className="form-control" placeholder="Password" onChange={(e) => this.passLog(e)} />
                </div>
                <button type="submit" className="boton btn btn-primary buttonSes"
                    onClick={() => this.registrarSesion()}> Registrar </button>
                    <br/>
                
                     <button type="submit" className="boton btn btn-primary buttonSes"
                    onClick={() => this.volver()}> Volver </button>
            </div>
           

        )

    }

    render() {
        return (

            <div className="container App">
                <div className="row">
                    <div className="App-header" >


                        <div className="col">

                            <img src={logo} className="App-logo" alt="logo" />
                            <p>Registrarse</p>


                        </div>
                        <div>

                        </div>
                    </div>
                    <div className="col">

                        {this.formRegist()}

                    </div>


                </div>
            </div>

        );
    }

}

export default Login;