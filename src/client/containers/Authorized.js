import React from 'react';
import {connect} from 'react-redux';

import Authorized from '../components/Authorized';
import { closeUnauthorizedDialog } from "./common/actions";

export default connect(
    state => {
        return {
            user: state.common.user,
            unauthorized: state.common.unauthorizedError
        };
    },
    {
        closeUnauthorizedDialog
    }
)(Authorized);