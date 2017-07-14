import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col, Form, Image } from 'react-bootstrap';
import Title from 'title/Title.jsx';
import RadioGroup from 'radioGroup/RadioGroup.jsx';
import Button from 'button/Button';
import Text from 'text/Text';


export default class PromoItem extends React.Component {
	render() {
		return (
			<Grid>
				<Row>
					<Col md={3}>
						<Image src={this.props.imageSrc} alt="Logo" itemProp="logo" />
					</Col>
					<Col md={9}>
						<Title text={this.props.title} />

						<Button>{this.props.type}</Button>

						<Text text={this.props.description} />

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