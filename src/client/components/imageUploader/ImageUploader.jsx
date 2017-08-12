import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import ImagePreview from "./components/ImagePreview";
import FontAwesome from 'react-fontawesome';

import { withStyles, createStyleSheet } from 'material-ui/styles';

import styles from './styles';
const styleSheet = createStyleSheet(styles);


@translate(['components'])
@withStyles(styleSheet)
export default class ImageUploader extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			imageObjects: []
		};
	}

	handleAddImage = (event) => {
		event.preventDefault();
		let reader = new FileReader();
		let file = event.target.files[0];

		reader.onloadend = () => {
			const newImageObject = {
				imageUrl: reader.result,
				file: file
			};
			this.props.onImageAdd(newImageObject);
		};

		reader.readAsDataURL(file);
	};

	handleDeleteImage = (imageIndex, event) => {
		event.preventDefault();
		this.props.onImageDelete(imageIndex);
	};

	render() {
		const {t, classes, ...other} = this.props;

		return (
			<div className={["d-flex", this.props.className].join(' ')} {...other}>
				<input id="file" multiple="multiple" name={this.props.name} className={classes.addImageInput} type="file" onChange={this.handleAddImage}/>

				<label htmlFor="file" className={classes.addImageLabel}>
					<FontAwesome name="camera" className={classes.cameraIcon} />
					<span>{t('ADD_PHOTO')}</span>
				</label>
				{
					this.props.imageObjects.map((imageObject, index) => {
						return (
							<ImagePreview imageUrl={imageObject.imageUrl} onDelete={this.handleDeleteImage.bind(null, index)} className="ml-3"/>
						);
					})
				}
			</div>
		);
	}
}

ImageUploader.propTypes = {
	imageObjects: PropTypes.any,
	onImageAdde: PropTypes.func,
	onImageDelete: PropTypes.func
};