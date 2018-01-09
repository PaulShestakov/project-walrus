import React from 'react';
import PropTypes from 'prop-types';
import Device from '../../core/device.js';
import DesktopPagination from './desktop';
import MobilePagination from './mobile';


export default class Pagination extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isMobile: Device.mobile
		};
	}

	render() {
		const {className} = this.props;

		return (
			<div className={className}>
				{
					this.state.isMobile ?
						<MobilePagination {...this.props} /> :
						<DesktopPagination {...this.props} />

				}
			</div>
		);
	}
}

Pagination.propTypes = {
	pagesNumber: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};
