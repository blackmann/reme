import React, { Component } from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import './App.css'
import Home from './pages/Home';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route path="/" component={Home} />
          </div>
        </BrowserRouter>

        <Footer />
      </div>
    );
  }
}

export default App;
