import React from 'react';
import {connect} from 'react-redux';

import NewCompanyComponent from '../../scenes/companies/NewCompany';

import {postCompany, updateCompany, loadCompany} from "../../actionCreators/newCompany";


const NewCompanyPage = connect(
    state => ({
        common: state.common,
        // new: state.newCompany,
        initialValues: state.newCompany.company
    }),
    {
        postCompany,
        updateCompany,
        loadCompany
    }
)(NewCompanyComponent);

export default NewCompanyPage;