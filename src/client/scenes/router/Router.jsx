import React from 'react';
import { Route, Switch } from "react-router-dom";
import CSSModules from 'react-css-modules';

import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';

import NewPromo from '../../containers/NewPromo';
import Promos from '../../containers/Promos';

import styles from './router.module.scss';

@CSSModules(styles)
export default class Router extends React.Component {
	render() {
		return (
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
		);
	}
}

