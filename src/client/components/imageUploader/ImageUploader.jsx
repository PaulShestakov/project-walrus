import React from 'react';
import CSSModules from 'react-css-modules';
import { translate, Interpolate, Trans } from 'react-i18next';
import ImagePreview from "./components/ImagePreview";
import FontAwesome from 'react-fontawesome';

import styles from './style.module.scss';


@translate(['components'])
@CSSModules(styles)
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

			this.setState({
				imageObjects: [...this.state.imageObjects, newImageObject]
			});
		};

		reader.readAsDataURL(file);
	};

	handleDeleteImage = (itemIndex, event) => {
		event.preventDefault();
		this.setState({
			imageObjects: [
				...this.state.imageObjects.slice(0, itemIndex),
				...this.state.imageObjects.slice(itemIndex + 1)
			]
		});
	};

	getFiles() {
		return this.state.imageObjects;
	}

	render() {
		const t = this.props.t;

		return (
			<div {...this.props} className={["d-flex", this.props.className].join(' ')}>
				<input id="file" multiple="multiple" name={this.props.name} styleName="addImageInput" type="file" onChange={this.handleAddImage}/>

				<label htmlFor="file" styleName="addImageLabel">
					<FontAwesome name="camera" styleName='cameraIcon' />
					<span>{t('ADD_PHOTO')}</span>
				</label>
				{
					this.state.imageObjects.map((imageObject, index) => {
						return (
							<ImagePreview imageUrl={imageObject.imageUrl} onDelete={this.handleDeleteImage.bind(null, index)} className="ml-3"/>
						);
					})
				}
			</div>
		);
	}
}