import React from 'react';
import logo from './logo.svg';
import './App.css';
import API from './service/api';
import Swal from 'sweetalert2';

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

            pathname: '/home',
            state: res,

        });



    }


    iniciarSesion() {
        const body = this.state;
        API.post('/login', body).then((res) => this.goToHome(res))
            .catch((e) => this.showLoginError(e))

    }

    showLoginError(e){
        if (e.response.status >= 400 ){
            Swal.fire({
                id: '400-login',
                icon: 'error',
                title: 'Email y password incorrectos',
                text: e.response.status,
              })
        } else {
            Swal.fire({
                id: 'other-error-login',
                icon: 'error',
                title: 'Servidor no responde u error desconocido',
                text: e.response.status,
              })
        }
        
    }

    registrarse() {

        this.props.history.push({
            pathname: '/registrarse'
        });

    }


    formLogin() {

        return (
            <div className="formLog">
                <div className="input-group form-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                    <input id="email" type="text" className="form-control" placeholder="Email" onChange={(e) => this.emailLog(e)} />
                </div>
                <div className="input-group form-group formLog1">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                    <input id="password" type="password" className="form-control" placeholder="Password" onChange={(e) => this.passLog(e)} />
                </div>
                <button id="loginButton" type="submit" className="boton btn btn-primary buttonSes"
                    onClick={() => this.iniciarSesion()}> Iniciar sesion </button>
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
                            <p>Login</p>
                        </div>
                    </div>
                    <div className="col">
                        {this.formLogin()}

                        <br />


                        <button type="submit" className="boton btn btn-primary buttonSes"
                            onClick={() => this.registrarse()}> Registrate </button>
                        <p className="loginP">Si no tienes cuenta</p>

                    </div>





                </div>




            </div>

        );
    }

}

export default Login;