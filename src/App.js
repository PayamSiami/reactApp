import './App.css';
import "react-toastify/dist/ReactToastify.css";

import React, { Component } from 'react';

import Container from './components/container';
import { ToastContainer } from "react-toastify";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Container />
      </div>
    );
  }
}

export default App;
