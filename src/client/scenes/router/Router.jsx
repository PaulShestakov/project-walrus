import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {Grid} from 'components';

import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';
import Promos from "../../containers/Promos";
import NewPromo from "../../containers/NewPromo";

import styles from './styles.scss';

export default class Router extends React.Component {
	render() {
		const classes = this.props.classes;

		return (
			<div className="appWrapper">
				<Header />

				<main>
					<Grid container justify="center">
						<Grid item md={9} className="flexGrowFull">
							<Switch>
								<Route exact path='/promos' component={Promos} />
								<Route path="/newPromo" component={NewPromo}/>
							</Switch>
						</Grid>
					</Grid>
				</main>

				{/*<Footer />*/}
			</div>
		);
	}
}

