import React from 'react';
import ReactDOM from 'react-dom';

import './style.global.scss';
import './assets/fonts/fonts.global.scss';
import './assets/img/favicon.ico';

import { BrowserRouter } from 'react-router-dom';
import Router from './containers/RootRouter';


// ---------------------- CONFIG JSS INSTANCE -----------------------//
import { I18nextProvider } from 'react-i18next';
import configI18n from './i18n/configI18n.js';

const i18n = configI18n();
// ---------------------- CONFIG JSS INSTANCE -----------------------//


// ---------------------- CONFIG REDUX -----------------------//
import { Provider as ReduxProvider } from 'react-redux';
import configureStore from './store/configStore.js';

const store = configureStore();
// ---------------------- CONFIG REDUX -----------------------//


// ---------------------- CONFIG JSS INSTANCE -----------------------//
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import preset from 'jss-preset-default';
import jssNested from 'jss-nested';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

const jss = create(preset());
jss.use(jssNested());
jss.options.createGenerateClassName = createGenerateClassName;
// ---------------------- CONFIG JSS INSTANCE -----------------------//


// ---------------------- CONFIG THEME -----------------------//
import { MuiThemeProvider } from 'material-ui/styles';
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
// ---------------------- CONFIG THEME -----------------------//

import './assets/img/apple-icon-120.png';
import './assets/img/apple-icon-180.png';

class Root extends React.Component {
	render() {
		return (
			<I18nextProvider i18n={i18n}>
				<ReduxProvider store={store}>
					<JssProvider jss={jss}>
						<MuiThemeProvider theme={theme}>
							<BrowserRouter>
								<Router />
							</BrowserRouter>
						</MuiThemeProvider>
					</JssProvider>
				</ReduxProvider>
			</I18nextProvider>
		);
	}
}

ReactDOM.render(<Root/>, document.getElementById('root'));
