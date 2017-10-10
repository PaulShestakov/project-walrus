import React from 'react';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Title, Button, Label, Textarea, TextField, Input, Text } from 'components';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';

import styles from './styles';
import TypeLabel from "./TypeLabel/index";

import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';


@translate(['promos', 'common'])
@withStyles(styles)
export default class PromoItem extends React.Component {

	formatCreationDate = (creationDate) => {
		return moment(creationDate).format('DD.MM.YYYY, HH:mm');
	};

	render() {
		const {t, classes, className, promo, ...other} = this.props;

		const imageSrc = promo.image ? `/uploads/${promo.image.split('/').slice(2).join('/')}` : '';

		return (
			<Card className={classes.card}>
				<CardMedia
					className={classes.cardImage}
					image={imageSrc}
				/>
				<CardContent>
					<Grid container spacing={4} direction="column">
						<Grid item>
							<Label fontsize="1.5rem">{promo.title}</Label>
						</Grid>
						<Grid item className="mt-2">
							<Grid container align="center">
								<Grid item>
									<TypeLabel tag="span" fontSize="1rem">{promo.typeId}</TypeLabel>
								</Grid>
								<Grid item>
									<Text fontSize="0.85rem">{this.formatCreationDate(promo.creationDate)}</Text>
								</Grid>
							</Grid>
						</Grid>
						<Grid item className="mt-2">
							<Text>{promo.description}</Text>
						</Grid>
						<Grid item className="mt-2">
							<Button accent="red" disableRipple={true}>
								<Link to={'/promoPage/' + promo.promoId} className={classes.link}>
									{t('Navigate')}
								</Link>
							</Button>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		);
	}
}

PromoItem.propTypes = {
	promo: PropTypes.shape({
		imageSrc: PropTypes.string,
		title: PropTypes.string,
	})
};
