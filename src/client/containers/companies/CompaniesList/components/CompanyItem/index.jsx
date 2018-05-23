import React from 'react';
import {translate} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Grid, Button, Title, Label, Textarea, TextField, Input, Text, Rating} from 'components';
import {withStyles} from 'material-ui/styles';
import Card, {CardMedia, CardContent} from 'material-ui/Card';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import styles from './styles.js';
import {Paper} from 'material-ui';
import defaultImage from '../../../../../assets/img/company-default.png';
import {ModeEdit as ModeEditIcon, DeleteForever as Delete, Block} from 'material-ui-icons';
import Authorized from '../../../../Authorized';
import Util from '../../../../util/index';


@translate(['companiesList'])
@withStyles(styles)
export default class CompanyItem extends React.PureComponent {

	handleAction = (company, action) => {
		let value = undefined;
		if (action === 'delete') {
			value = {
				companyId: company.companyId,
				action: this.props.deleteAction,
				title: 'Удаление компании',
				message: `Вы действительно хотите удалить ${company.name}?`,
			};
		} else {
			value = {
				companyId: company.companyId,
				action: this.props.blockAction,
				title: 'Блокировка компании',
				message: `Вы действительно хотите заблокировать ${company.name}? (Функция не реализована пока что)`,
			};
		}
		this.props.handleAction(value);
	};

	render() {
		const { t, classes, company, match, companyBaseUrl } = this.props;

		return (
			<Card className={classNames(classes.card, 'mt-3', 'p-4')}>
				<Grid container justify="center" spacing={24}>
					<Grid item xs={12} md={4} style={{ minHeight: '200px' }}>
						<Link to={`${companyBaseUrl}/company/${encodeURI(company.url_id)}`}>
							<Paper className="h-100 d-flex">
								<CardMedia
									className={classes.cardImage}
									image={Util.encodeUrl(company.logo, defaultImage)} />
							</Paper>
						</Link>
					</Grid>
					<Grid item xs={12} md={8}>
						<Grid container spacing={0} className={classNames(classes.cardContent, 'p-0')}>

							<Grid item className={classNames(classes.headerWrapper, 'mb-2')}>

								<Link to={`${companyBaseUrl}/company/${encodeURI(company.url_id)}`} className={classes.headerLink}>
									<Label uppercase bold fontSize="1.5rem" fontFamily={'fontOpenSans'}>
										{company.name}
									</Label>
								</Link>

								<Authorized
									allowedRoles={[1]}>

									<Link to={`/company/edit/${encodeURI(company.url_id)}`}>
										<Button variant="fab" className={classes.editButton}>
											<ModeEditIcon className={classes.editIcon} />
										</Button>
									</Link>
									<Button variant="fab" className={classes.editButton}
										onClick={this.handleAction.bind(null, company, 'block')}>
										<Block className={classes.editIcon} />
									</Button>
									<Button variant="fab" className={classes.editButton}
										onClick={this.handleAction.bind(null, company, 'delete')}>
										<Delete className={classes.editIcon} />
									</Button>

								</Authorized>

							</Grid>

							<Grid item className={classNames(classes.flexRow, 'mb-2')}>
								<Link to={`${companyBaseUrl + encodeURI(company.url_id)}/feedbacks`}>
									<div className={classes.flexRow}>
										<div className={classes.ratingControl}>
											<Rating
												readOnly
												value={company.averageRating}
												itemStyle={classes.small}
												itemIconStyle={classes.smallIcon} />
										</div>
										<Text>Отзывов : {company.numberOfFeedbacks}</Text>
									</div>
								</Link>
							</Grid>

							<Grid item className={classNames(classes.flexRow, 'mb-2')}>
								<FontAwesome name="map-marker" className={classes.icon} />
								<Text>{ company.mainLocation.cityName + ': ' + company.mainLocation.address } </Text>
							</Grid>
							{
								company.url &&
								<Grid item className={classNames(classes.flexRow, 'mb-2')}>
									<FontAwesome name="globe" className={classes.icon} />
									<a href={company.url} target="_blank" rel="nofollow" className={classes.companyUrl}>
										{company.url}
									</a>
								</Grid>
							}
							<Grid item className={classNames(classes.buttonsBlock, 'mb-2')}>
								<Grid container>
									{
										[
                                        	{
                                        		link: company.vk,
												image: 'vk'
											},
											{
                                        		link: company.facebook,
												image: 'facebook'
											},
											{
												link: company.instagram,
												image: 'instagram'
											}
										].map(item => {
											if (item.link) {
												return (
													<Grid item>
														<a href={item.link} target="_blank" rel="nofollow">
															<FontAwesome name={item.image}
																		 className={classes.greyIcon} />
														</a>
													</Grid>
												);
											}
										})
									}
								</Grid>
							</Grid>

							<Grid item>
								<Button className="mr-2 mt-2 text-white" accent="white"
									onClick={this.props.handleOpenWorkingTimeDialog.bind(null, company.mainLocation.workingTimes)}>
									{t('WORKING_TIME')}
								</Button>
								<Button className="mr-2 mt-2 text-white" accent="white"
									onClick={this.props.handleOpenPhonesDialog.bind(null, company.mainLocation.phones)}>
									Телефоны
								</Button>
								{
									company.numberOfLocations > 0 &&
									<Link to={`${companyBaseUrl}/company/${company.url_id}/contacts`}>
										<Button className="mr-2 mt-2 text-white" accent="white">
											Филиалы ({ company.numberOfLocations })
										</Button>
									</Link>
								}
							</Grid>

						</Grid>
					</Grid>

				</Grid>
			</Card>
		);
	}
}
