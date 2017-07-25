import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next';

import configureStore from './store/configStore.js';
import configI18n from './i18n/configI18n.js';

import Router from './scenes/router/Router';

import './assets/fonts/fonts.global.scss';
import './assets/img/favicon.ico';

const store = configureStore();
const i18n = configI18n();

class Root extends React.Component {
  render() {
    return (
		<I18nextProvider i18n={i18n}>
			<Provider store={store}>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</Provider>
		</I18nextProvider>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
