import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Title, Button, Card, Label, Textarea, TextField, Input, Text } from 'components';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import moment from 'moment';

import styles from './styles';
import TypeLabel from "./components/typeLabel/TypeLabel";
const styleSheet = createStyleSheet(styles);



// TODO: maybe use https://www.npmjs.com/package/dotenv for everything?
const HOST='http://localhost';
const PORT = '8080';


@withStyles(styleSheet)
export default class PromoItem extends React.Component {

	formatCreationDate = (creationDate) => {
		return moment(creationDate).format('DD.MM.YYYY, HH:mm');
	};


	render() {
		const {classes, className, promo, ...other} = this.props;

		return (
			<Card>
				<Grid container>
					<Grid item md={3}>
						{
							promo.image &&
							<img className={classes.image} src={`${HOST}:${PORT}/images/${promo.image.split('/').slice(2).join('/')}`} />
						}
					</Grid>
					<Grid item md={9}>
						<Grid container spacing={4} direction="column">
							<Grid item>
								<Label fontsize="1.5rem" className="mt-3">{promo.title}</Label>
							</Grid>
							<Grid item>
								<Grid container align="center">
									<Grid item>
										<TypeLabel tag="span" fontSize="1rem">{promo.typeId}</TypeLabel>
									</Grid>
									<Grid item>
										<Text fontSize="0.85rem">{this.formatCreationDate(promo.creationDate)}</Text>
									</Grid>
								</Grid>
							</Grid>
							<Grid item>
								<Text>{promo.description}</Text>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
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
