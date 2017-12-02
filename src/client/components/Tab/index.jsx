import React from 'react';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { Tab as MaterialTab } from 'material-ui/Tabs';

import styles from './styles';

class Tabs extends React.Component {
    render() {
        const {input, meta, ...other} = this.props;

        return (
            <MaterialTab  {...input} {...other} />
        );
    }
}

export default withStyles(styles)(Tabs);