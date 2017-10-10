import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab } from "components";
import styles from './styles';
import classNames from 'classnames';

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';


@translate(['common'])
@withStyles(styles)
export default class PromoPage extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const promoId = this.props.match.params.promoId;

		if (promoId) {
			this.props.loadPromo(promoId);
		}
	}

	render() {
		const {t, classes, promo, ...other} = this.props;

		const imageSrc = promo.image ? `/uploads/${promo.image.split('/').slice(2).join('/')}` : '';

		return (

			<Card className={classNames('mt-4', classes.card)}>
				<CardMedia
					className={classes.cardImage}
					image={imageSrc}
				/>
				{JSON.stringify(promo)}
			</Card>
		);
	}
};