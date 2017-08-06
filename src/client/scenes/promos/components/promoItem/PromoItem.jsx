import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

import { Grid, Row, Col, Form, Image } from 'react-bootstrap';
import { Title, Text, Label } from 'components';

import DefaultImage from '../../../../assets/img/promo-default.png';

import styles from './style.module.scss';

@CSSModules(styles)
export default class PromoItem extends React.Component {
	render() {

		let image = this.props.imageSrc ? this.props.imageSrc : DefaultImage;

		return (
			<Grid styleName="promoItem">
				<Row>
					<Col md={3}>
						{
							<Image src={image}
								alt={this.props.title}
								itemProp="logo"
								className="w-100"/>
						}
					</Col>
					<Col md={9}>
						<Row className="mb-2">
							<Label fontSize="1.5rem">{this.props.title}</Label>
						</Row>


						<Row className="mb-2">
							<Col>
								<Label accent="red" fontSize="1rem" className="p-2">
									{this.props.type}
								</Label>
							</Col>
							<Col className="ml-2">
								<Text>{this.props.date}</Text>
							</Col>
						</Row>

						<Row className="mb-2">
							<Text accent="grey">{this.props.description}</Text>
						</Row>

						<Title text={this.props.price} />
					</Col>
				</Row>
			</Grid>
		);
	}
};

PromoItem.propTypes = {
	title: PropTypes.string,
	type: PropTypes.string,
	imageSrc: PropTypes.string,
	date: PropTypes.string,
	description: PropTypes.string,
	price: PropTypes.string,
};