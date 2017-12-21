import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from 'components';
import styles from './styles';
import { Link } from 'react-router-dom';
import { Paper, CardMedia, Typography } from 'material-ui';
import Util from '../../../../util/index';
import defaultImage from '../../../../../assets/img/404.png';

@translate(['common'])
@withStyles(styles)
export default class Type extends React.Component {

	render() {
		const { classes, type, match } = this.props;
		return (
			<Grid container={true} spacing={0}>
				{
					type.subcategories.map((subcategory, index) => {
						const renderImage = subcategory.value.toLowerCase() !== 'services_ritualnie_uslugi';
						return (
							<Grid item={true} xs={12} sm={6}
								md={4} lg={3} className="p-3">
								<Link key={index}
									className={classes.exactTypeLink}
									to={`${match.url}/${subcategory.value.toLowerCase()}/BY`}>
									<Paper>
										<CardMedia
											className={classes.cardImage}
											image={renderImage ? Util.encodeUrl(subcategory.imageUrl, defaultImage) : ''} />
										<div className="d-flex justify-content-between p-2">
											<Typography component="h2" className={classes.categoryLabel}>
												{subcategory.label}
											</Typography>
											<div className={classes.numberWrapper}>
												{subcategory.count}
											</div>
										</div>
									</Paper>
								</Link>
							</Grid>
						);
					})
				}
			</Grid>
		);
	}
}
