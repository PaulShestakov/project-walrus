import React from 'react';
import InfoDialog from "../Dialog/Information/index"

export default class Authorized extends React.Component {
    constructor(props) {
        super(props);
    }

    closeCallback = () => {
      this.props.closeUnauthorizedDialog();
    };

    render() {
        const { user, allowedRoles } = this.props;
        if (allowedRoles.includes(user.role)) {
            return (
                <div>
                    {
                        this.props.children
                    }
                    <InfoDialog
                        open={this.props.unauthorized}
                        title="Ошибка"
                        message="У вас нет прав на данное действие"
                        closeCallback={this.closeCallback}/>
                </div>
            );
        } else {
            return null;
        }
    }
}