import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'

import configureStore from './store/configStore.js';
const store = configureStore();

import { I18nextProvider, translate } from 'react-i18next';
import i18n from 'i18next';

import Header from './scenes/header/Header.jsx';
import Footer from './scenes/footer/Footer.jsx';
import PromoCreation from './scenes/newPromo/NewPromo.jsx';

import './app.scss';
import './assets/img/favicon.ico';

// Fonts
require('font-awesome/css/font-awesome.css');
require('./assets/css/variables.scss');

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


class App extends React.Component {
  render() {
    return (
		<I18nextProvider i18n={i18n}>
			<Provider store={store}>
				<BrowserRouter>
					<div className="appWrapper">
						<Header className='appHeader' />

						<main>
							<Switch>
								<Route path='/promoCreation' component={PromoCreation} />
							</Switch>
						</main>

						<Footer className='appFooter' />
					</div>
				</BrowserRouter>
			</Provider>
		</I18nextProvider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
