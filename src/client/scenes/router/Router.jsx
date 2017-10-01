import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {Grid} from 'components';

import Header from '../header/Header.jsx';
import Footer from '../footer/Footer.jsx';

import PromosList from "../../containers/promos/PromosList";
import NewPromo from "../../containers/promos/NewPromo";
import PromoPage from "../../containers/promos/PromoPage";
import Cookies from 'universal-cookie';


import CompanyRoute from "../../containers/companies/Company";

import styles from './styles.scss';

export default class Router extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		//this.props.loadUserInfo();
	}

	render() {
		const { classes } = this.props;

		return (
			<div className="appWrapper">
				<Header />

				<main>
					<Grid container justify="center">
						<Grid item md={9} className="flexGrowFull">
							<Switch>
								<Route path="/promoPage/:promoId" component={PromoPage} />
								<Route path="/newPromo" component={NewPromo} />
								<Route exact path='/promosList' component={PromosList} />

								<Route path="/company" component={CompanyRoute} />

							</Switch>
						</Grid>
					</Grid>
				</main>

				{/*<Footer />*/}
			</div>
		);
	}
}

