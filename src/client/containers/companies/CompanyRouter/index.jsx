import React from 'react';
import {connect} from 'react-redux';

import {
	loadCompaniesCodeValues,
	loadUserInfo,
	closeUnauthorizedDialog,
	goToLogin,
	goToAddCatalogs
} from '../../common/actions';

import {Switch, Redirect} from 'react-router-dom';

import Authorized from '../../Authorized';
import NewCompany from '../NewCompany/index';
import CompaniesList from '../CompaniesList/index';
import CompaniesOverview from '../CompaniesOverview/index';
import CompanyPage from '../CompanyPage';
import CrumbRoute from '../../../components/CrumbRoute';

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
					<CrumbRoute
						path="/company/new"
						component={(props) => (
							<Authorized
								allowedRoles={[1,2,3,4]}
								unauthorizedAction={() => this.props.goToAddCatalogs(this.props.history)}>
								<NewCompany {...props}/>
							</Authorized>
						)}
						title="Создание компании" />

					<CrumbRoute
						path="/company/edit/:url_id"
						component={(props) => (
							<Authorized
								allowedRoles={[1]}
								unauthorizedAction={() => this.props.goToLogin(this.props.history)}>
								<EditComponent {...props}/>
							</Authorized>
						)}
						title="Редактирование компании" />

					<CrumbRoute
						path="/company/:companyCategoryId/:companySubcategoryId/company/:url_id/contacts/:filial_url_id"
						component={CompanyPage}
						title="Страница филиала"/>

					<CrumbRoute
						path="/company/:companyCategoryId/:companySubcategoryId/company/:url_id"
						component={CompanyPage}
						title="Описание компании" />

					<CrumbRoute
						path="/company/:companyCategoryId/:companySubcategoryId/:countryId?/:cityId?"
						component={CompaniesList}
						title="Подкатегория" />

					<CrumbRoute
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
		goToLogin,
		goToAddCatalogs
	}
)(CompanyRouterContainer);

export default CompanyRouter;