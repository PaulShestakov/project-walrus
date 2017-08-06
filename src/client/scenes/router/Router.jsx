import React from 'react';
import CSSModules from 'react-css-modules';

import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';

import styles from './router.module.scss';
import {Redirect, Route, Switch} from "react-router-dom";
import Promos from "../../containers/Promos";
import NewPromo from "../../containers/NewPromo";
import {Grid} from "material-ui";

@CSSModules(styles)
export default class Router extends React.Component {
	render() {
		return (
			<div styleName="appWrapper">
				<Header />

				<main>
					<Grid container justify="center">
						<Grid item xs={8}>
							<Switch>
								<Route exact path="/promos" component={Promos}/>
								<Route path="/promos/new" component={NewPromo}/>
								<Redirect from="/" to="/promos"/>
							</Switch>
						</Grid>
					</Grid>
				</main>

				<Footer styleName='appFooter' />
			</div>
		);
	}
}

