import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Row, Col, Form, Image } from 'react-bootstrap';
import { Title, Text } from 'components';


export default class PromoItem extends React.Component {
	componentWillMount() {
		this.item = this.props.item;
	}

	render() {
		return (
			<Grid>
				<Row>
					<Col md={3}>
						{/*<Image src={this.item.imageSrc} alt={this.props.title} itemProp="logo" />*/}
					</Col>
					<Col md={9}>
						<Title text={this.item.title} />

						<Row>
							<Col>
								<Text text={this.item.type} />
								<Text text={this.item.date} />
							</Col>
						</Row>


						<Text text={this.item.description} />

						<Title text={this.item.price} />
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