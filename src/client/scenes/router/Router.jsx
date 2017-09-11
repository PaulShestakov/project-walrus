import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {Grid} from 'components';

import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';
import PromosList from "../../containers/promos/PromosList";
import NewPromo from "../../containers/promos/NewPromo";
import PromoPage from "../../containers/promos/PromoPage";

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
								<Route exact path='/promosList' component={PromosList} />
								<Route path="/newPromo" component={NewPromo}/>
								{/*<Route path="/promo/:promoId" component={PromoPage}/>*/}

							</Switch>
						</Grid>
					</Grid>
				</main>

				{/*<Footer />*/}
			</div>
		);
	}
}

