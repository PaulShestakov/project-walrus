import React from 'react';
import {connect} from 'react-redux';

import {
	loadCompaniesCodeValues,
	loadUserInfo,
	closeUnauthorizedDialog
} from "../../common/actions";

import {Route, Switch} from "react-router-dom";

import NewCompany from "../NewCompany/index";
import CompaniesList from "../CompaniesList/index";
import CompaniesOverview from "../CompaniesOverview/index";
import CompanyPage from "../CompanyPage";
import CrumbRoute from "../../../components/CrumbRoute"




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

					<CrumbRoute path="/company/new" component={NewCompany} title="Создание компании" />
					<CrumbRoute path="/company/list" component={CompaniesList} title="Список компаний" />
					<CrumbRoute path="/company/overview" component={CompaniesOverview} title="Компании" />
					<CrumbRoute path="/company/edit/:companyId" component={EditComponent} title="Редактирование компании" />
					<CrumbRoute path="/company/:companyId" component={CompanyPage} title="Страница компании" />

					{/*<Route path="/company/new" component={NewCompany} />*/}
					{/*<Route path="/company/list" component={CompaniesList} />*/}
					{/*<Route path="/company/overview" component={CompaniesOverview} />*/}
					{/*<Route path="/company/edit/:companyId" component={EditComponent} />*/}
					{/*<Route path="/company/:companyId" component={CompanyPage} />*/}
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