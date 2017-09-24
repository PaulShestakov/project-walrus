import React from 'react';
import {connect} from 'react-redux';

import NewCompanyComponent from '../../scenes/companies/newCompany/NewCompany';

import {postCompany} from "../../actionCreators/newCompany/index";
import {loadCompanyCategories} from "../../actionCreators/common";


const CompanyPage = connect(
    state => {
        return {
            common: state.common,
            new: state.newCompany
        };
    },
    {
        postCompany,
        loadCompanyCategories
    }
)(NewCompanyComponent);

export default CompanyPage;