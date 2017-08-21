import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Title, Button, Card, Label, Textarea, TextField, Input, Text } from 'components';
import { withStyles, createStyleSheet } from 'material-ui/styles';

import styles from './styles';
const styleSheet = createStyleSheet(styles);


// TODO: maybe use https://www.npmjs.com/package/dotenv for everything?
const HOST='http://localhost';
const PORT = '8080';


@withStyles(styleSheet)
export default class PromoItem extends React.Component {
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
						<Grid container direction="column">
							<Grid item>
								<Title tag="h4" fontSize="1.5rem">{promo.title}</Title>
							</Grid>
							<Grid item>
								<Grid container>
									<Grid item>
										<Title tag="span" fontSize="1rem">{promo.typeId}</Title>
									</Grid>
									<Grid item>
										<Title tag="span" fontSize=".5rem">{promo.creationDate}</Title>
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
