import React from 'react';
import {connect} from 'react-redux';

import NewCompanyComponent from '../../scenes/Companies/NewCompany';

import {postCompany} from "../../actionCreators/newCompany";
import {loadCompanyCategories} from "../../actionCreators/common";
import {loadCompaniesCodeValues} from "../../actionCreators/common";


const CompanyPage = connect(
    state => ({
        common: state.common,
        new: state.newCompany,
        initialValues: {
            locations: [
                {
                    label: 'Aдрес 1',
                    phones: [{}]
                },
            ]
        }
    }),
    {
        postCompany
    }
)(NewCompanyComponent);

export default CompanyPage;