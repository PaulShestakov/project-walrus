import React from 'react';
import { Route, Switch } from "react-router-dom";

import About from './containers/About.js';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <main>
          <Switch>
            <Route exact path='/' component={Header}/>
            <Route exact path='/about' component={Footer}/>
          </Switch>
        </main>
        <Footer/>
      </div>
    );
  }
};
