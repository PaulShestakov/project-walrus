import React from 'react';
import { connect } from 'react-redux';
import { USER_ROLES } from '../../containers/util/constants';
import Device from '../../core/device.js';
import MobileHeader from './mobile';
import DesktopHeader from './desktop';


class Header extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isMobile: Device.mobile
		};
	}

	render() {
		return (
			<header className={this.props.className} itemType="http://schema.org/Header" itemScope>
				{
					this.state.isMobile ? <MobileHeader {...this.props} /> : <DesktopHeader {...this.props} />
				}
			</header>
		);
	}
}

export default connect(
	state => {
		return {
			isAuthorized: state.common.user.role !== USER_ROLES.ROLE_GUEST
		};
	},
	{}
)(Header);
