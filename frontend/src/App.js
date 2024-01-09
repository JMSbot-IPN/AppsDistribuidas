// App.js
import React from 'react';
import {Route, BrowserRouter as Router  } from 'react-router-dom'
// import FileUploader from './components/FileUploader';
// import FileDownloader from './components/FileDownloader';
import Login from './components/Login';
import Carrusel from './components/Carrusel';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
   // <Router> 
    <div class='container'>
      <Home/>
      {/* <Route exact path='/' Component={Login}></Route> */}
    </div>
    //</Router>
  );
}

export default App;