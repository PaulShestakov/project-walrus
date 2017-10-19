import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import {Grid} from 'material-ui';

import Header from '../Header';
import Footer from '../Footer';

import PromosList from "../../containers/promos/PromosList";
import NewPromo from "../../containers/promos/NewPromo";
import PromoPage from "../../containers/promos/PromoPage";
import CompanyRouter from "../../containers/companies/CompanyRouter";

export default class Router extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		//this.props.loadUserInfo();
	}

	render() {
		return (
			<div className="appWrapper">
				<Header />

				<main>
					<Grid container justify="center" spacing={0}>
						<Grid item xs={9} className="flexGrowFull">
							<Switch>
								<Route path="/promoPage/:promoId" component={PromoPage} />
								<Route path="/newPromo" component={NewPromo} />
								<Route exact path='/promosList' component={PromosList} />

								<Route path="/company" component={CompanyRouter} />
							</Switch>
						</Grid>
					</Grid>
				</main>

				{/*<Footer />*/}
			</div>
		);
	}
}

