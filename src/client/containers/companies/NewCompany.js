import React from 'react';
import {connect} from 'react-redux';

import NewCompanyComponent from '../../scenes/companies/newCompany/NewCompany';

import {postCompany} from "../../actionCreators/newCompany/index";
import {loadCompanyCategories} from "../../actionCreators/common";
import {loadCompaniesCodeValues} from "../../actionCreators/common";


const CompanyPage = connect(
    state => {
        return {
            common: state.common,
            new: state.newCompany
        };
    },
    {
        postCompany,
        loadCompanyCategories,
        loadCompaniesCodeValues
    }
)(NewCompanyComponent);

export default CompanyPage;