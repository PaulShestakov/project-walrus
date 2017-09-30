import React from 'react';
import {Route, Switch} from "react-router-dom";

import CompanyPage from "../../containers/companies/CompanyPage";
import NewCompany from "../../containers/companies/NewCompany";
import CompaniesList from "../../containers/companies/CompaniesList";
import CompaniesOverview from "../../containers/companies/CompaniesOverview";

export default class CompanyRoute extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.loadCompaniesCodeValues();
    }

    render() {
        return (
            <Switch>
                <Route path="/company/new" component={NewCompany} />
                <Route path="/company/list" component={CompaniesList} />
                <Route path="/company/overview" component={CompaniesOverview} />
                <Route path="/company/:companyId" component={CompanyPage} />
            </Switch>
        );
    }
}