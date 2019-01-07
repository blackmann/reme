import React, { Component } from 'react'
import { HashRouter, Route } from "react-router-dom"
import './App.css'
import Home from './pages/Home';
import Footer from './components/Footer';
import Upload from './pages/Upload';

class App extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <Route path="/upload/" component={Upload} />
            <Route path={["/", "/detail/"]} exact component={Home} />
          </div>
        </HashRouter>

        <Footer />
      </div>
    );
  }
}

export default App;
