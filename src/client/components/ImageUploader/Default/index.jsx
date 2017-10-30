import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import ImagePreview from "./ImagePreview/index";
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import {Title, Grid, Card, Label, Text, TextField} from "components";
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle} from 'material-ui/Dialog';


@translate(['components'])
class ImageUploader extends React.Component {
	constructor(props) {
		super();

		this.state = {
			showImagesMaxLimitExceededDialog: false
		};
	}

	handleAddImage = (event) => {
		event.preventDefault();
		const images = this.props.value;

		if (images.length >= this.props.imageObjectsMaxLimit) {
			// Show warning message
			this.toggleImagesMaxLimitExceededDialog(true);

		} else {
			// Call onChange with new imageObjects value

			let reader = new FileReader();
			let file = event.target.files[0];

			reader.onloadend = () => {
				const newImageObject = {
					imageUrl: reader.result,
					file: file
				};

				this.props.onChange([...images, newImageObject]);
			};

			reader.readAsDataURL(file);
		}
	};

	handleDeleteImage = (imageIndex, event) => {
		event.preventDefault();

		const images = this.props.value;

		this.props.onChange([...images.slice(0, imageIndex), ...images.slice(imageIndex + 1)]);
	};

	toggleImagesMaxLimitExceededDialog = (showDialog) => {
		this.setState({
			showImagesMaxLimitExceededDialog: showDialog
		});
	};

	render() {
		const {t, classes, className, value, onChange} = this.props;

		return (
			<div className={classNames(classes.main, className)}>
				<input
					id="file"
					multiple="multiple"
					name={this.props.name}
					className={classes.addImageInput}
					type="file"
					onChange={this.handleAddImage} />

				<Card className="mt-3 mr-3">
					<label htmlFor="file" className={classes.addImageLabel}>
						<FontAwesome name="camera" className={classes.cameraIcon} />
						<Label fontSize="1.25rem" className="mt-1">{t('ADD_PHOTO')}</Label>
					</label>
				</Card>

				{
					value && value.map((imageObject, index) => {
						return (
							<ImagePreview key={index}
								imageUrl={imageObject.imageUrl}
								onDelete={this.handleDeleteImage.bind(null, index)}
								className="mr-3 mt-3"/>
						);
					})
				}

				<Dialog open={this.state.showImagesMaxLimitExceededDialog}
						onRequestClose={this.toggleImagesMaxLimitExceededDialog.bind(null, false)}>
					<DialogTitle>{"Warning"}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{`Maximum allowed number of images is: ${this.props.imageObjectsMaxLimit}.`}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.toggleImagesMaxLimitExceededDialog.bind(null, false)} color="primary">
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(ImageUploader);

ImageUploader.propTypes = {
	imageObjectsMaxLimit: PropTypes.number,
	onImageAdd: PropTypes.func,
	onImageDelete: PropTypes.func
};