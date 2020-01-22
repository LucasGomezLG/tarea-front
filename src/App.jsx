import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';


function App() {
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
      </Switch>
    </BrowserRouter>




  );
}

export default App;
