import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { Switch as MaterialSwitch } from 'material-ui';

import styles from './styles';

class Switch extends React.Component {
    render() {
        const { classes, meta, input, ...other } = this.props;
        return (
            <MaterialSwitch {...input} checked={!!input.value} {...other} />
        );
    }
}

export default withStyles(styles)(Switch);