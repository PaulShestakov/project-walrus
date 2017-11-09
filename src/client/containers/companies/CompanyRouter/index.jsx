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
import CrumbRoute from "../../../components/CrumbRoute";

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
					{/*<Route path="/company/new" component={NewCompany} />*/}
					{/*<Route path="/company/list" component={CompaniesList} />*/}
					{/*<Route path="/company/overview" component={CompaniesOverview} />*/}
					{/*<Route path="/company/edit/:url_id" component={EditComponent} />*/}
					{/*<Route path="/company/:url_id" component={CompanyPage} />*/}
					{/*<Redirect to='/company/overview' />*/}

					<CrumbRoute path="/company/new" component={NewCompany} title="Создание компании" />
					<CrumbRoute path="/company/edit/:url_id" component={EditComponent} title="Редактирование компании" />
                    <CrumbRoute path="/company/:categoryId/:subCategoryId/:url_id/contacts/:filial_url_id"
								component={CompanyPage} title="Страница филиала"/>
                    <CrumbRoute path="/company/:categoryId/:subCategoryId/:url_id" component={CompanyPage} title="Страница компании" />
					<CrumbRoute path="/company/:categoryId/:subCategoryId" component={CompaniesList} title="Список компаний" />
					<CrumbRoute path="/company/:categoryId" component={CompaniesOverview} title="Компании" />
					<Redirect to='/company/health' />

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