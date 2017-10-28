import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next';
import createHistory from 'history/createBrowserHistory';

import configureStore from './store/configStore.js';
import configI18n from './i18n/configI18n.js';

import Router from './containers/RootRouter';

import './style.global.scss';

import './assets/fonts/fonts.global.scss';
import './assets/img/favicon.ico';
import {BrowserRouter} from "react-router-dom";

import { MuiThemeProvider } from 'material-ui/styles';

const store = configureStore();
const i18n = configI18n();


import { createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			50: '#f3e2e2',
			100: '#e0b6b6',
			200: '#cc8686',
			300: '#b75656',
			400: '#a73131',
			500: '#980d0d',
			600: '#900b0b',
			700: '#850909',
			800: '#7b0707',
			900: '#6a0303',

			A100: '#e0b6b6',
			A200: '#cc8686',
			A400: '#b75656',
			A700: '#a73131',

			contrastDefaultColor: 'light'
		}
	}
});


class Root extends React.Component {
  render() {
    return (
		<I18nextProvider i18n={i18n}>
			<Provider store={store}>
				<MuiThemeProvider theme={theme}>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</MuiThemeProvider>
			</Provider>
		</I18nextProvider>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
