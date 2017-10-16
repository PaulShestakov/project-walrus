import React from 'react';
import { withStyles } from 'material-ui/styles';
import { Tabs as MaterialTabs } from 'material-ui';

import styles from './styles';

class Tabs extends React.Component {
    render() {
        const {input, meta, children, ...other} = this.props;

        return (
            <MaterialTabs {...input} {...other}>
                {children}
            </MaterialTabs>
        );
    }
}

export default withStyles(styles)(Tabs);