import React    from 'react';
import {render} from 'react-dom';
//import { Router, Route, browserHistory } from "react-router";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from 'react-redux'

// import { useRouterHistory }   from 'react-router';
// import { createHashHistory }  from 'history';
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

import configureStore from './app/store/configStore.js';
const store = configureStore();

import About from './app/containers/About.js';
/*
<Provider store={store}>
        <Router exact="{true}" path="/" component={App}>
          <Switch>

            <Route path="/about" component={About} />

            <Route path="/about2">
              <div>123123123</div>
            </Route>
          </Switch>
        </Router>
      </Provider>*/

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>

            <Route path="/" component={About} />

          </Switch>
        </Router>
      </Provider>
    );
  }
};

render(<App/>, document.getElementById('app'));
