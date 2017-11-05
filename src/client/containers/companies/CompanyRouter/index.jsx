import React from 'react';
import {connect} from 'react-redux';

import {
	loadCompaniesCodeValues,
	loadUserInfo,
	closeUnauthorizedDialog
} from "../../common/actions";

import {Route, Switch, Redirect} from "react-router-dom";

import NewCompany from "../NewCompany/index";
import CompaniesList from "../CompaniesList/index";
import CompaniesOverview from "../CompaniesOverview/index";
import CompanyPage from "../CompanyPage";


const EditComponent = (props) => {
	return <NewCompany editMode {...props} />;
};

class CompanyRouterContainer extends React.Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.loadUserInfo();
		this.props.loadCompaniesCodeValues();
	}

	render() {
		return (
			<div>
				<Switch>
					<Route path="/company/new" component={NewCompany} />
					<Route path="/company/list" component={CompaniesList} />
					<Route path="/company/overview" component={CompaniesOverview} />
					<Route path="/company/edit/:url_id" component={EditComponent} />
					<Route path="/company/:url_id" component={CompanyPage} />
					<Redirect to='/company/overview' />
				</Switch>
			</div>

		);
	}
}

const CompanyRouter = connect(
	state => {
		return {
			common : state.common
		};
	},
	{
		loadUserInfo,
		loadCompaniesCodeValues,
		closeUnauthorizedDialog,
	}
)(CompanyRouterContainer);

export default CompanyRouter;