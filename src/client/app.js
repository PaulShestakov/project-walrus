import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'

import configureStore from './store/configStore.js';

import { I18nextProvider, translate } from 'react-i18next';
import i18n from 'i18next';

import Header from './scenes/header/Header.jsx';
import Footer from './scenes/footer/Footer.jsx';

import NewPromo from './containers/NewPromo';
import Promos from './containers/Promos';

import styles from './app.scss';
import './assets/img/favicon.ico';

// Fonts
require('./assets/fonts/fonts.scss');

// Config i18n, keep in mind, that using this loader we
// load all locales, regardless of whether we need them or not
i18n.init({
	lng: 'ru',
	fallbackLng: false,
	// Have a common namespace used around the full app
	ns: ['common'],
	defaultNS: 'common',
	resources: require("i18next-resource-store-loader!./assets/i18n/index.js")
});

const store = configureStore();

@CSSModules(styles)
class App extends React.Component {
  render() {
    return (
		<I18nextProvider i18n={i18n}>
			<Provider store={store}>
				<BrowserRouter>
					<div styleName="appWrapper">
						<Header />

						<main>
							<Switch>
								<Route path='/promos' component={Promos} />
								<Route path='/newPromo' component={NewPromo} />
							</Switch>
						</main>

						<Footer styleName='appFooter' />
					</div>
				</BrowserRouter>
			</Provider>
		</I18nextProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
