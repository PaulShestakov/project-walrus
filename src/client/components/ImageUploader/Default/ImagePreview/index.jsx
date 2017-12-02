import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import {Card} from "material-ui";


@withStyles(styles)
export default class ImagePreview extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {classes, className, imageUrl, onDelete, ...other} = this.props;

		const backgroundImageStyle = {
			background: `url(${encodeURI(imageUrl)})`,
			backgroundSize: 'cover'
		};

		return (
			<Card className={classNames(className, classes.imagePreview)} {...other} >
				<div style={backgroundImageStyle} className={classes.image} />

				<button onClick={onDelete} className={classes.deleteButton}>
					<FontAwesome name="times" className={classes.deleteButtonCross} />
				</button>
			</Card>
		)
	}
}

ImagePreview.propTypes = {
	imageUrl: PropTypes.string,
	onDelete: PropTypes.func
};