import React from 'react';
import {connect} from 'react-redux';

import Component from '../components/Authorized';

export default connect(
    state => {
        return {
            user: state.common.user
        };
    },
    {

    }
)(Component);