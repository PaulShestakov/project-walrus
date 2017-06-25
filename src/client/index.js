import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'

import configureStore from './app/store/configStore.js';
const store = configureStore();

import App from './app/app.jsx';

// Fonts
require('font-awesome/css/font-awesome.css');
require('./assets/fonts/fontBebasNeueRegular/fontBebasNeueRegular.scss');


class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </Provider>
    );
  }
};


ReactDOM.render(<Root/>, document.getElementById('root'));
