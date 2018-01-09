import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Button from 'material-ui/Button';
import { ArrowBack, ArrowForward } from 'material-ui-icons';
import styles from './styles';

const SHOW_NEARBY_PAGES_NUMBER = 2;


@withStyles(styles)
export default class Pagination extends React.Component {

	handleGoToPrevious = () => {
		this.props.onChange(this.props.currentPage - 1);
	};

	handleGoToNext = () => {
		this.props.onChange(this.props.currentPage + 1);
	};

	renderPageNumer = (page) => {
		return (
			<Button fab mini
				className="mx-1"
				key={page}
				color={page === this.props.currentPage ? 'primary' : undefined}
				aria-label="pageNumber"
				onClick={() => this.props.onChange(page)}>
				{page}
			</Button>
		);
	};

	render() {
		const {classes, className, pagesCount, currentPage, onChange } = this.props;

		const shouldBeRendered = pagesCount > 0;
		if (!shouldBeRendered) {
			return null;
		}

		const floatingPages = [];
		for (let i = currentPage - SHOW_NEARBY_PAGES_NUMBER; i <= currentPage + SHOW_NEARBY_PAGES_NUMBER; i++) {
			if (i >= 1 && i <= pagesCount) {
				floatingPages.push(i);
			}
		}

		const firstFloatingPage = floatingPages[0];
		const lastFloatingPage = floatingPages[floatingPages.length - 1];

		const separator = (
			<div className={classes.separator}>
				<span>...</span>
			</div>
		);

		const itemsToRender = [
			firstFloatingPage > 1 ? this.renderPageNumer(1) : null,
			firstFloatingPage > 2 ? separator : null,
			...floatingPages.map(this.renderPageNumer),
			lastFloatingPage < pagesCount - 1 ? separator : null,
			lastFloatingPage < pagesCount ? this.renderPageNumer(pagesCount) : null
		];

		return (
			<div className={classNames(className, classes.pageContainer)}>
				<Button fab mini color="primary"
					className="mr-3"
					aria-label="toPrevious"
					disabled={currentPage <= 1}
					onClick={this.handleGoToPrevious}>
					<ArrowBack />
				</Button>
				{itemsToRender}
				<Button fab mini color="primary"
					className="ml-3"
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
