import React from 'react';
import ReactDOM from 'react-dom';
import CSSModules from 'react-css-modules';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next';

import configureStore from './store/configStore.js';
import configI18n from './i18n/configI18n.js';

import Header from './scenes/header/Header.jsx';
import Footer from './scenes/footer/Footer.jsx';

import NewPromo from './containers/NewPromo';
import Promos from './containers/Promos';

import './app.global.scss';
import './assets/fonts/fonts.global.scss';

import styles from './app.module.scss';
import './assets/img/favicon.ico';

const store = configureStore();
const i18n = configI18n();

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
