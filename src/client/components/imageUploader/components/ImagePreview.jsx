import React from 'react';
import CSSModules from 'react-css-modules';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';

import styles from './style.module.scss';

@CSSModules(styles)
export default class ImagePreview extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div {...this.props} styleName="imagePreview">
				<img src={this.props.imageUrl} styleName="image" />
				<button onClick={this.props.onDelete} styleName="deleteButton">
					<FontAwesome name="times" styleName='deleteButtonCross' />
				</button>
			</div>
		)
	}
}

ImagePreview.propTypes = {
	imageUrl: PropTypes.string,
	onDelete: PropTypes.func
};