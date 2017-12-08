import React from 'react';
import InfoDialog from '../Dialog/Information/index';

export default class Authorized extends React.Component {
	constructor(props) {
		super(props);
	}

    closeCallback = () => {
    	this.props.closeUnauthorizedDialog();
    };

    render() {
    	const { user, allowedRoles, className, notAuthorized, unauthorizedAction, children } = this.props;
		let allowed = true;
		if (allowedRoles) {
			allowed = allowedRoles.find(role => (role === user.role))
		}

    	if (allowed) {
    		return (
    			<div className={className}>
    				{
    					children
    				}
    				<InfoDialog
    					open={this.props.unauthorized}
    					title="Ошибка"
    					message="У вас нет прав на данное действие"
    					closeCallback={this.closeCallback}/>
    			</div>
    		);
    	} else {
			if (unauthorizedAction) {
				unauthorizedAction();
			}
    		return notAuthorized || null;
    	}
    }
}