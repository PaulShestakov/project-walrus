import React from 'react';
import {connect} from 'react-redux';

import {
	loadCompaniesCodeValues,
	loadUserInfo,
	closeUnauthorizedDialog
} from '../../common/actions';

import {Switch, Redirect} from 'react-router-dom';

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
						component={NewCompany}
						title="Создание компании" />

					<CrumbRoute
						path="/company/edit/:url_id"
						component={EditComponent}
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
	}
)(CompanyRouterContainer);

export default CompanyRouter;