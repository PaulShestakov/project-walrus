import React from 'react';
import { Route, Switch } from "react-router-dom";

import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';

import './app.scss';

export default class App extends React.Component {
  render() {
    return (
      <div className='appWrapper'>
        <Header className='appHeader' />

        <main>
          <Switch>
          </Switch>
        </main>

        <Footer className='appFooter' />
      </div>
    );
  }
};
