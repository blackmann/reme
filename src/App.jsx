import React, { Component } from 'react'
import { HashRouter, Route } from "react-router-dom"
import ReactGA from "react-ga"
import './App.css'
import Home from './pages/Home';
import Footer from './components/Footer';
import Upload from './pages/Upload';

class App extends Component {
  componentDidMount() {
    ReactGA.initialize('UA-131943593-1')
    ReactGA.event({
      category: 'User',
      action: 'Launch site'
    })
  }

  render() {
    return (
      <div>
        <HashRouter>
          <div>
            <Route path="/upload/" component={Upload} />
            <Route path={["/", "/detail/"]} exact component={Home} />


            <Footer />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
