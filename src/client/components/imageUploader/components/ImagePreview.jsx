import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FontAwesome from 'react-fontawesome';

import { withStyles, createStyleSheet } from 'material-ui/styles';

import styles from './styles';
const styleSheet = createStyleSheet(styles);


@withStyles(styleSheet)
export default class ImagePreview extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {classes, className, ...other} = this.props;

		return (
			<div className={classNames(className, classes.imagePreview)} {...other} >
				<img src={this.props.imageUrl} className={classes.image} />
				<button onClick={this.props.onDelete} className={classes.deleteButton}>
					<FontAwesome name="times" className={classes.deleteButtonCross} />
				</button>
			</div>
		)
	}
}

ImagePreview.propTypes = {
	imageUrl: PropTypes.string,
	onDelete: PropTypes.func
};