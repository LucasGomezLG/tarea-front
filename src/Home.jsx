import React from 'react';
import logo from './logo.svg';
import './App.css';
import Swal from 'sweetalert2';
import API from './service/api.js';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tareas: [],
      tareasFiltradas: [],
    }
  }

  componentDidMount() {

    API.get('/tareas').then((res) => this.setState({ tareas: res }))
      .catch((error) => console.log(error));

  }

  colorPrioridad(valor) {

    if (valor === "Alta") {


      return (

        <span class="badge badge-secondary altoColor">{valor}</span>

      )

    } else if (valor === "Media") {

      return (
        <span class="badge badge-secondary medioColor">{valor}</span>
      )

    } else if (valor === "Baja"){

      return (
        <span class="badge badge-secondary bajaColor">{valor}</span>
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
              <button className="btn btn-primary" onClick={() => { this.borrarTarea(tarea.id) }} >Eliminar</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

  borrarTarea(id) {

    API.delete(`/tarea/${id}`).then((res) => this.componentDidMount()).catch((error) => console.log(error))

  }

  crearTareaNueva(valores) {
    API.post('/addtarea', { nombre: valores[1], descripcion: valores[2], prioridad: valores[0] })
      .then(() => this.componentDidMount())
      .catch((error) => console.log(error))
  }

  agregarTarea() {

    return (

      Swal.mixin({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3']
      }).queue([
        {
          title: 'Agregar prioridad de la tarea',
          text: '',
          input: 'radio',
          inputOptions: {
            'Alta': 'Alta',
            'Media' : 'Media',
            'Baja': 'Baja'
          },
          inputValidator: (input) => {
            if (!input) {
              return 'Necesitas elegir una prioridad!'
            }
          }
        },{

          title:'Nombre de la tarea',
          text:'',
          inputValidator: (text) => {
            if (!text) {
              return 'Necesitas agregar nombre a la tarea!'
            }
          }

        },
        {
          title:'Descripcion de la tarea',
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

    this.setState({ tareasFiltradas: this.state.tareas.filter((tarea) => tarea.nombre.includes(e.target.value)) });


  }

  render() {
    return (

      <div className="container App">
        <div className="row">
          <div className="App-header" >
            <div className="col">
              <img src={logo} className="App-logo" alt="logo" />
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
