import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from 'components';
import styles from './styles';
import { Link } from 'react-router-dom';
import { Paper, CardMedia, Typography } from 'material-ui';
import Util from '../../../../util/index';
import defaultImage from '../../../../../assets/img/404.png';
import Chip from 'material-ui/Chip';
import classNames from 'classnames';
import subcategoriesImages from '../../../../../metadata/subcategoriesImages.js';

import '../../../../../assets/img/subcategoriesImages/dog_friendly_zavedenia.png';
import '../../../../../assets/img/subcategoriesImages/gruming.png';
import '../../../../../assets/img/subcategoriesImages/internet_magazin.png';
import '../../../../../assets/img/subcategoriesImages/kulinaria.png';
import '../../../../../assets/img/subcategoriesImages/mebel.png';
import '../../../../../assets/img/subcategoriesImages/vetapteka.png';
import '../../../../../assets/img/subcategoriesImages/vetkliniki.png';
import '../../../../../assets/img/subcategoriesImages/vetpreparaty.png';


@translate(['common'])
@withStyles(styles)
export default class SubcategoriesView extends React.Component {

	render() {
		const { classes, subcategories, match } = this.props;
		return (
			<Grid container={true} spacing={0}>
				{
					subcategories.map((subcategory, index) => {
						const subcategoryId = subcategory.value.toUpperCase();
						const imageData = subcategoriesImages.find(x => x.subcategoryId === subcategoryId);

						const imagePath = imageData ?
							`/images/${imageData.image}` :
							defaultImage;

						const style = {
							'background-size': imageData ? 'cover' : 'contain'
						};

						return (
							<Grid key={subcategory.value} item={true} xs={12} sm={6} md={4} lg={3} className="p-3">
								<Link className={classes.exactTypeLink}
									to={`${match.url}/${subcategory.value.toLowerCase()}/BY`}>
									<Paper>
										<CardMedia
											style={style}
											className={classes.cardImage}
											image={imagePath} />
										<div className={classNames("p-2", classes.cardContent)}>
											<Typography component="h2" className={classes.categoryLabel}>
												{subcategory.label}
											</Typography>
											<Chip label={subcategory.count} />
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
