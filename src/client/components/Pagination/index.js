import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Button from 'material-ui/Button';

import styles from './styles';

@withStyles(styles)
export default class Pagination extends React.Component {

	render() {
		const {classes, className, pagesCount, currentPage, onChange, ...other} = this.props;

		const pages = new Array(pagesCount).fill(0).map((_, i) => i + 1);

		return (
			<div className={classNames(className, classes.pageContainer)}>
				{
					pages.map(page => (
						<Button
							className="mx-1"
							key={page}
							fab={true}
							mini={true}
							// color="accent"
							aria-label="edit"
							onClick={() => onChange(page)}>
							{page}
						</Button>
					))
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
