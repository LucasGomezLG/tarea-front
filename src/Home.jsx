import React from 'react';
import logo from './logo.svg';
import './App.css';
import Swal from 'sweetalert2';
import API from './service/api.js';
import LogoutIcon from './icons/exit.png';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tareas: [],
      tareasFiltradas: [],
      username: '',
      user: {id: ''},

    }
  }


  componentDidMount() {

    this.setState({user: this.props.location.state})
    
    const paramReq = {
     id: this.props.location.state.id
    }

    API.get('/user', paramReq).then((res) => this.setState({ tareas: res.tareas }))
      .catch((error) => console.log(error));


    this.setState({ username: this.props.location.state.username });

    localStorage.setItem("username", this.props.location.state.username);

  }

  colorPrioridad(valor) {

    if (valor === "Alta") {


      return (

        <span className="badge badge-secondary altoColor">{valor}</span>

      )

    } else if (valor === "Media") {

      return (
        <span className="badge badge-secondary medioColor">{valor}</span>
      )

    } else if (valor === "Baja") {

      return (
        <span className="badge badge-secondary bajaColor">{valor}</span>
      )

    }


  }


  transformarTareas(tarea) {

    return (
      <div className="col-4 card-style" key={tarea.id}>
        <div className="">
          <div className="card">
            <div className="card-body">
              {this.colorPrioridad(tarea.prioridad)}
              <h5 className="card-title">{tarea.nombre}</h5>
              <p className="card-text">{tarea.descripcion}</p>
              <button className="btn btn-outline-info butonAct" onClick={() => { this.goToActividades(tarea.id) }} >Ver actividades</button>
              <button className="btn btn-danger" onClick={() => { this.borrarTarea(tarea.id) }} >Eliminar</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

  goToActividades(id) {

    this.props.history.push({

      pathname: '/actividades',
      state: {
        idTarea: id,
        username: this.state.username
      },
      

    });

  }

  


  borrarTarea(id) {

    Swal.fire({
      title: '¿Seguro quieres eliminar la tarea?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          '!Tarea eliminada!',
          '',
          'success'
        )
        API.delete(`/tarea/${id}`).then((res) => this.componentDidMount()).catch((error) => console.log(error));
      }
    })

  }

  crearTareaNueva(valores) {
    API.post('/addtarea', { idUsuario: this.state.user.id,nombre: valores[1], descripcion: valores[2], prioridad: valores[0] })
      .then(() => this.componentDidMount())
      .catch((error) => console.log(error))
  }

  agregarTarea() {

    return (

      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4']
      }).queue([
        {
          title: 'Agregar prioridad de la tarea',
          text: '',
          input: 'radio',
          inputOptions: {
            'Alta': 'Alta',
            'Media': 'Media',
            'Baja': 'Baja'
          },
          inputValidator: (input) => {
            if (!input) {
              return 'Necesitas elegir una prioridad!'
            }
          }
        }, {

          title: 'Nombre de la tarea',
          text: '',
          inputValidator: (text) => {
            if (!text) {
              return 'Necesitas agregar nombre a la tarea!'
            }
          }

        },
        {
          title: 'Descripcion de la tarea',
          text: '',
          inputValidator: (text) => {
            if (!text) {
              return 'Necesitas agregar una descripcion a la tarea!'
            }
          }
        },
        {
          title: 'Actividades',
          text:'',
          inputValidator: (text) => {
            if (!text) {
              return 'Necesitas agregar nombre a la tarea!'
            }
          }
        }


      ]).then((result) => {
        if (result.value) {
          this.crearTareaNueva(result.value);
          Swal.fire({
            title: 'Tarea lista!',
            html: ` prioridad: ${result.value[0]}<br />
            nombre: ${result.value[1]}<br />
            desc: ${result.value[2]} <br />
            
            `,
            confirmButtonText: 'Listorti!'
          })
        }
      })
    )

  }

  renderizarTareas() {

    if (this.state.tareas.length === 0) {


      return (

        <h1 className="noTarea">No hay tareas</h1>

      );

    } else {

      if (this.state.tareasFiltradas.length === 0) {

        return (

          <div className="row mx-auto">

            {this.state.tareas.map((tarea) => this.transformarTareas(tarea))}

          </div>
        )

      } else {

        return (

          <div className="row mx-auto">

            {this.state.tareasFiltradas.map((tarea) => this.transformarTareas(tarea))}


          </div>
        )
      }

    }



  };

  buscador(e) {

    this.setState({ tareasFiltradas: this.state.tareas.filter((tarea) => tarea.nombre.toLowerCase().includes(e.target.value.toLowerCase())) });


  }


  mostrarUsuario() {

    return (

      <div>
        <h3>{this.state.username}</h3>
      </div>
    )
  }

  exit() {

    this.props.history.push({

      pathname: '/',

    })

  }

  render() {
    return (

      <div className="container App">
        <div className="row">
          <div className="App-header" >


            <div className="col">
              <div>
                {this.mostrarUsuario()}
                <img className="cursorExit" src={LogoutIcon} alt="" onClick={() => this.exit()} />
              </div>
              <img src={logo} className="App-logo " alt="exit" />
              <p>Tareas</p>

              <input type="text" placeholder="Buscar tarea..." onChange={(e) => this.buscador(e)}></input>

              <br />
              <button className="boton btn btn-primary" onClick={() => this.agregarTarea()} >Agregar tarea </button>
            </div>
            <div>

            </div>
          </div>
          <div className="col">


            <div>
              <h1>Lista de tareas</h1>

              {this.renderizarTareas()}


            </div>


          </div>


        </div>
      </div>

    );
  }

}

export default Home;
