import React from 'react';
import {Route, Switch} from "react-router-dom";

import NewCompany from "../../containers/companies/NewCompany";
import CompaniesList from "../../containers/companies/CompaniesList";
import CompaniesOverview from "../../containers/companies/CompaniesOverview";
import EditCompany from "../../containers/companies/EditCompany";
import CompanyPage from "../../containers/companies/CompanyPage";

export default class CompanyRoute extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadUserInfo();
        this.props.loadCompaniesCodeValues();
    }

    render() {
        return (
            <Switch>
                <Route path="/company/new" component={NewCompany} />
                <Route path="/company/list" component={CompaniesList} />
                <Route path="/company/overview" component={CompaniesOverview} />
                <Route path="/company/edit/:companyId" component={EditCompany} />
                <Route path="/company/:companyId" component={CompanyPage} />
            </Switch>
        );
    }
}