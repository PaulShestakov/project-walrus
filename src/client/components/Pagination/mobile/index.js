import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { ArrowBack, ArrowForward } from 'material-ui-icons';
import styles from './styles';


@withStyles(styles)
export default class Pagination extends React.Component {

	handleGoToPrevious = () => {
		this.props.onChange(this.props.currentPage - 1);
	};

	handleGoToNext = () => {
		this.props.onChange(this.props.currentPage + 1);
	};

	render() {
		const {classes, className, currentPage, pagesCount } = this.props;

		const shouldBeRendered = pagesCount > 0;
		if (!shouldBeRendered) {
			return null;
		}

		return (
			<div className={classNames(className, classes.pageContainer)}>
				<Button fab mini
					color="primary"
					className="mr-1"
					aria-label="toPrevious"
					disabled={currentPage <= 1}
					onClick={this.handleGoToPrevious}>
					<ArrowBack />
				</Button>
				<Button fab mini disabled
					className="mx-1"
					key={currentPage}
					aria-label="pageNumber"
					onClick={() => this.props.onChange(page)}>
					{currentPage}
				</Button>
				<Button fab mini
					color="primary"
					className="ml-1"
					aria-label="toNext"
					disabled={currentPage >= pagesCount}
					onClick={this.handleGoToNext}>
					<ArrowForward />
				</Button>
			</div>
		);
	}
}

Pagination.propTypes = {
	pagesCount: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired
};
