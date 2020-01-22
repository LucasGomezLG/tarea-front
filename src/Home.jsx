import React from 'react';
import logo from './logo.svg';
import './App.css';
import API from './service/api.js';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tareas: [],
    }
  }

  componentDidMount() {

    API.get('/tareas').then((res) => this.setState({ tareas: res }))
      .catch((error) => console.log(error));

  }


  transformarTareas(tarea) {

    return (
      <div className="col-4 card-style" key={tarea.id}>
        <div className="">
          <div className="card">
            <div className="card-body">
              <span class="badge badge-secondary">{tarea.prioridad}</span>
              <h5 className="card-title">{tarea.nombre}</h5>
              <p className="card-text">{tarea.descripcion}</p>
              <button  className="btn btn-primary" onClick={() => {this.borrarTarea(tarea.id)}} >Eliminar</button>
            </div>
          </div>
        </div>
      </div>

    );
  }

  borrarTarea(id) {
 
     API.delete(`/tarea/${id}`).then((res) => this.componentDidMount()).catch((error) => console.log(error))

  }  

  renderizarTareas() {

    if (this.state.tareas.length === 0) {

      return (

        <h1 className="noTarea">No hay tareas</h1>

      );

    } else {

      return (

        <div className="row mx-auto">

          {this.state.tareas.map((tarea) => this.transformarTareas(tarea))}


        </div>

      )
    }



  };

  render() {
    return (

      <div className="container App">
        <div className="row">
          <div className="App-header" >
            <div className="col">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Tareas
    </p>
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
