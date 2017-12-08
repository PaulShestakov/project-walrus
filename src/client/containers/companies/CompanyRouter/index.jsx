import React from 'react';
import {connect} from 'react-redux';

import {
	loadCompaniesCodeValues,
	loadUserInfo,
	closeUnauthorizedDialog,
} from '../../common/actions';

import {Switch, Redirect} from 'react-router-dom';

import { Route } from 'react-router';

import Authorized from '../../Authorized';
import NewCompany from '../NewCompany/index';
import CompaniesList from '../CompaniesList/index';
import CompaniesOverview from '../CompaniesOverview/index';
import CompanyPage from '../CompanyPage';
import CrumbRoute from '../../../components/CrumbRoute';
import { PAGES } from '../../util/constants';

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
					<Route
						path="/company/new"
						component={(props) => (
							<Authorized
								allowedRoles={[1]}
								unauthorizedAction={() => window.location = PAGES.ADD_CATALOGS}>
								<NewCompany {...props}/>
							</Authorized>
						)}
						title="Создание компании" />

					<Route
						path="/company/edit/:url_id"
						component={(props) => (
							<Authorized
								allowedRoles={[1]}
								unauthorizedAction={() => window.location = PAGES.LOGIN_PAGE}>
								<EditComponent {...props}/>
							</Authorized>
						)}
						title="Редактирование компании" />

					<Route
						path="/company/:companyCategoryId/:companySubcategoryId/company/:url_id/contacts/:filial_url_id"
						component={CompanyPage}
						title="Страница филиала"/>

					<Route
						path="/company/:companyCategoryId/:companySubcategoryId/company/:url_id"
						component={CompanyPage}
						title="Описание компании" />

					<Route
						path="/company/:companyCategoryId/:companySubcategoryId/:countryId?/:cityId?"
						component={CompaniesList}
						title="Подкатегория" />

					<Route
						path="/company/:companyCategoryId"
						component={CompaniesOverview}
						title="Категории" />

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