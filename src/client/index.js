import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next';
import { history } from './store/configStore';

import configureStore from './store/configStore.js';
import configI18n from './i18n/configI18n.js';

import Router from './scenes/router/Router';

import './style.global.scss';

import './assets/fonts/fonts.global.scss';
import './assets/img/favicon.ico';
import {BrowserRouter} from "react-router-dom";

const store = configureStore();
const i18n = configI18n();

class Root extends React.Component {
  render() {
    return (
		<I18nextProvider i18n={i18n}>
			<Provider store={store}>
				<BrowserRouter  history={history}>
					<Router />
				</BrowserRouter>
			</Provider>
		</I18nextProvider>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
