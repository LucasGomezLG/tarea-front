import React from 'react';
import logo from './logo.svg';
import './App.css';
import API from './service/api';
import Swal from 'sweetalert2';

class Registrarse extends React.Component {
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

    registerPopUp(res){
        Swal.fire({
            icon: 'success',
            title: 'Cuenta registrada',
            text: 'Ingrese desde el login, por favor',
          }).then(() => this.goToHome(res))
          .catch((e) => console.log(e))
    }

    showRegisterError(e){
        if (e.response && e.response.status) {
            Swal.fire({
                icon: 'error',
                title: 'Algo malio sal',
                text: 'El email ya existe',
              })
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Algo malio sal',
                text: 'Espere y intente de nuevo',
              })
        }

    }

    registrarSesion(){

        const body = this.state;

        if (body.username.trim().length > 0 && body.password.trim().length > 0) {
            API.post('/signup', body).then((res) => this.registerPopUp(res))
            .catch((e) => this.showRegisterError(e))
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Algo salio mal',
                text: 'Complete todos los campos por favor!',
              })
        }
        


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
                    <input id="email-register" type="email" className="form-control" placeholder="Email" onChange={(e) => this.emailLog(e)} />
                </div>
                <div className="input-group form-group formLog1">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                    <input id="password-register" type="password" className="form-control" placeholder="Password" onChange={(e) => this.passLog(e)} />
                </div>
                <button id="button-register" type="submit" className="boton btn btn-primary buttonSes"
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

export default Registrarse;