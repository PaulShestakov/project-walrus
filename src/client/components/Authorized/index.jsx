import React from 'react';

export default class Authorized extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        if (this.props.allowedRoles.includes(user.role)) {
            return this.props.children;
        } else {
            return null;
        }
    }
}