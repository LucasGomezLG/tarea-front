import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Registrarse from './Registrarse';

function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} />} />
        <Route exact path="/home" render={(props) => <Home {...props} />} />
        <Route exact path="/registrarse" render={(props) => <Registrarse {...props} />} />
        
        <Route path="/" render={(props) => <Login {...props} />} />

      </Switch>
    </BrowserRouter>




  );
}

export default App;
