import React from 'react';
import {connect} from 'react-redux';

import Component from '../components/Authorized';

const Autorized = connect(
    state => {
        return {
            user: state.common.user
        };
})(Component);

export default Autorized;