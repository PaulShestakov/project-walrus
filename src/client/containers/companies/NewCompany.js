import React from 'react';
import {connect} from 'react-redux';

import NewCompanyComponent from '../../scenes/Companies/NewCompany';

import {postCompany} from "../../actionCreators/newCompany";
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
        postCompany
    }
)(NewCompanyComponent);

export default CompanyPage;