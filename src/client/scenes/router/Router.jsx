import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import CSSModules from 'react-css-modules';

import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';

import styles from './router.module.scss';
import Promo from "../promo/Promo";

@CSSModules(styles)
export default class Router extends React.Component {
	render() {
		return (
			<div styleName="appWrapper">
				<Header />

				<main>
					<Switch>
						<Route path='/promos' component={Promo} />
						<Redirect from="/" to="promos" />
					</Switch>
				</main>

				<Footer styleName='appFooter' />
			</div>
		);
	}
}

