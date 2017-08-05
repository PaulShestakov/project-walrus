import React from 'react';
import CSSModules from 'react-css-modules';
import {Redirect, Route, Switch} from 'react-router';

import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';
import Promo from "../promo/Promo";

import {Grid} from 'components';

import styles from './style.module.scss';

@CSSModules(styles)
export default class Router extends React.Component {
	render() {
		const classes = this.props.classes;

		return (
			<div styleName="appWrapper">
				<Header />

				<main>
					<Grid container justify="center">
						<Grid item md="9" styleName="flexGrowFull">
							<Switch>
								<Route path='/promos' component={Promo} />
								<Redirect from='/' to='/promos' />
							</Switch>
						</Grid>
					</Grid>
				</main>

				<Footer />
			</div>
		);
	}
}

