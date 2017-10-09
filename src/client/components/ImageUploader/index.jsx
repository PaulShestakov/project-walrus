import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import ImagePreview from "./ImagePreview";
import FontAwesome from 'react-fontawesome';
import { withStyles } from 'material-ui/styles';
// import {Card} from "material-ui";
import styles from './styles';
import {Title, Grid, Card, Label, Text, TextField} from "components";

import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';


@translate(['components'])
class ImageUploader extends React.Component {
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
		const {t, classes, className, imageObjects, ...other} = this.props;

		return (
			<div className={classes.main}>
				<input id="file"
					multiple="multiple"
					name={this.props.name}
					className={classes.addImageInput}
					type="file"
					onChange={this.handleAddImage}/>

				<Card className="mt-3 mr-3">
					<label htmlFor="file" className={classes.addImageLabel}>
						<FontAwesome name="camera" className={classes.cameraIcon} />
						<Label fontSize="1.25rem" className="mt-1">{t('ADD_PHOTO')}</Label>
					</label>
				</Card>


				{
					imageObjects.map((imageObject, index) => {
						return (
							<ImagePreview key={index}
								imageUrl={imageObject.imageUrl}
								onDelete={this.handleDeleteImage.bind(null, index)}
								className="mr-3 mt-3"/>
						);
					})
				}
			</div>
		);
	}
}

export default withStyles(styles)(ImageUploader);

ImageUploader.propTypes = {
	imageObjects: PropTypes.any,
	onImageAdd: PropTypes.func,
	onImageDelete: PropTypes.func
};