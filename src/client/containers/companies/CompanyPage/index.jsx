import React from 'react';
import {connect} from 'react-redux';
import { createSelector } from 'reselect';

import FontAwesome from 'react-fontawesome';

import {loadCompany, postFeedback, deleteFeedback} from "./actions";
import { removeCompany } from '../CompaniesList/actionCreators/companiesList';

import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, ConfirmDialog } from "components";
import styles from './styles';

import { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {Divider, Typography, Paper} from "material-ui";
import { Pets, Call, Mail, Public, LocationOn, ModeEdit as ModeEditIcon, DeleteForever as Delete, Block } from 'material-ui-icons';
import CompanyInfo from "./components/Info/index";
import Feedbacks from "./components/Feedback/index";
import defaultCompanyImage from '../../../assets/img/company-default.png';

import {Route, Link} from 'react-router-dom'
import NewFeedback from "./components/Feedback/NewFeedback/index";
import Contacts from "./components/Contacts/index";
import Authorized from "../../../containers/Authorized";
import CrumbRoute from "../../../components/CrumbRoute/index"
import Util from "../../util/index";


@translate(['common'])
@withStyles(styles)
class CompanyPageContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 0,
			isConfirmDialogOpened: false,
			company: {},
			locationToDisplay: null
		};
	}

	componentDidMount() {
		const url_id = this.props.match.params.url_id;

		if (url_id) {
			this.props.loadCompany(url_id);
		}
	}

	componentWillReceiveProps(newProps) {
		const lastWord = newProps.location.pathname.split("/").slice(-1)[0];
		let index;
		if (lastWord === 'feedbacks') {
			index = 1;
		} else if (lastWord === 'feedback') {
			index = -1;
		} else if (lastWord === 'contacts') {
			index = 2;
		} else {
			index = 0;
		}

		let location = undefined;
		const filialUrlId = newProps.match.params.filial_url_id;
		if (filialUrlId) {
			location = newProps.company.locations.find(location => location.url_id === filialUrlId);
		} else {
			location = newProps.company.mainLocation;
		}
		this.setState({ selectedTab: index, locationToDisplay: location });
	}

	handleAction = (company, action) => {
		let value = undefined;
		if (action === 'delete') {
			value = {
                companyId: company.companyId,
				action: this.delete,
				title: 'Удаление компании',
				message: `Вы действительно хотите удалить ${company.name}?`,
			}
		}
		this.setState({ isConfirmDialogOpened: true, company: value});
	};

	handleTabPress = (event, index) => {
		this.setState({ selectedTab: index });
		const { match, history } = this.props;
		let url = match.url;
		if (index === 1) {
            url += '/feedbacks';
		} else if (index === 2) {
            url += '/contacts';
		}
        history.push(url);
	};

	deleteFeedback = (feedbackId) => {
        const { deleteFeedback, company, history, match } = this.props;
		deleteFeedback({
            redirectUrl: match.url + "/feedbacks",
			companyId: company.companyId,
			url_id: company.url_id,
			feedbackId
		}, history);
	};

	onPostFeedback = (data) => {
		const { postFeedback, history, match } = this.props;
        data.redirectUrl = match.url + "/feedbacks";
        data.url_id = match.params.url_id;
        postFeedback(data, history);
	};

	delete = () => {
		this.setState({ isConfirmDialogOpened: false });
		this.props.removeCompany(this.state.company.companyId, this.props.history);
	};

	render() {
		const {t, classes, company, common, markers, match } = this.props;
		const { locationToDisplay } = this.state;
		const phonesText = locationToDisplay ? locationToDisplay.phones.map(p => (p.phone)).join(', ') : "Телефонов нет";
		let companyName = company.name;
		if (locationToDisplay && locationToDisplay.cityName) {
			companyName += " г. " + locationToDisplay.cityName;
		}
		return (
			<div className={classes.mainCardWrapper}>
				<Card raised className={classNames(classes.mainCard, "my-3")}>
					<CardContent>
						<Grid container>
							<Grid item xs={8}>
								<Typography type="headline" component="h2">
									{companyName}
								</Typography>
								<Typography component="p">
									{company.subcategoryName}
								</Typography>
							</Grid>
							<Grid item xs={4}>
								{
                                    locationToDisplay &&
									<Authorized allowedRoles={[5]}>
										<Link to={`${match.url}/feedback`} className={classes.link}>
											<Button accent="red" className='w-100'>
                                                {t('Оставить отзыв')}
											</Button>
										</Link>
									</Authorized>
								}
								<Authorized allowedRoles={[5]} className={classes.editButtonsBlock}>
									<Button fab className={classes.editButton}>
										<Link to={`/company/edit/${company.url_id}`}>
											<ModeEditIcon className={classes.editIcon} />
										</Link>
									</Button>
									<Button fab className={classes.editButton}
											onClick={this.handleAction.bind(null, company, 'delete')}>
										<Delete className={classes.editIcon} />
									</Button>
								</Authorized>
							</Grid>
						</Grid>
						<Divider className="mt-4 mb-2" />

						<Grid container>
							<Grid item xs={4}>
								<Paper className="mx-auto h-100">
									<CardMedia
										className={classes.cardImage}
										image={Util.encodeUrl(company.logo, defaultCompanyImage)}
									/>
								</Paper>
							</Grid>
							<Grid item xs={8}>
								<Grid container spacing={16}>
									{
										company.email &&
										<Grid item xs={12} className="d-flex align-items-center">
											<Mail className="mr-2"/>
											<Typography component="p">
												{company.email}
											</Typography>
										</Grid>
									}
									{
										company.url &&
										<Grid item xs={12} className="d-flex align-items-center">
											<Public className="mr-2"/>
											<Typography component="p">
												<a href={company.url} target="_blank" rel="nofollow">
													{company.url}
												</a>
											</Typography>
										</Grid>
									}
									<Grid item xs={12}>
										<Grid container spacing={16}>
                                            {
                                                locationToDisplay && locationToDisplay.address &&
												<Grid item xs={12} className="d-flex align-items-center">
													<LocationOn className="mr-2"/>
													<Typography component="p">
                                                        {locationToDisplay.address}
													</Typography>
												</Grid>
                                            }
											{
                                                locationToDisplay && phonesText &&
												<Grid item xs={12}
													  className="d-flex align-items-center">
													<Call className="mr-2"/>
													<Typography component="p">
                                                        {phonesText}
													</Typography>
												</Grid>
											}
										</Grid>
									</Grid>
									<Grid item xs={12}>
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
                                                        )
                                                    }
                                                })
                                            }
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Grid>

						<Divider className="mt-4" />
						<Tabs indicatorColor="primary"
							  onChange={this.handleTabPress}
							  value={this.state.selectedTab}
							  textColor="primary"
							  classes={{
								  root: classes.tabs
							  }}>
							<Tab label={t('Инфо')}/>
							<Tab label={t('Отзывы')} disabled={!locationToDisplay}/>
							<Tab label={t('Адреса и контакты')}/>
						</Tabs>
						<Divider />
						<div className={classes.context}>
							<CrumbRoute exact path={`${this.props.match.url}`}
								render={() => <CompanyInfo company={ company } />}
								title="Информация о компании"
							/>

							<CrumbRoute exact path={`${this.props.match.url}/feedbacks`}
								   render={() => <Feedbacks feedbacks={ locationToDisplay ? locationToDisplay.feedbacks : [] }
															deleteFeedback={ this.deleteFeedback }/>}
								   title="Отзывы"
							/>


							<CrumbRoute path={`${this.props.match.url}/feedback`}
								   render={() => <NewFeedback user={ common.user }
															  companyInfo={{
                                                                  companyId: company.companyId,
                                                                  locationId: locationToDisplay ? locationToDisplay.locationId : null
                                                              }}
															  onPostFeedback={this.onPostFeedback}/>}
								   title="Новый отзыв"
							/>

							<CrumbRoute exact path={`${this.props.match.url}/contacts`}
								   render={() => <Contacts locations={ company.locations }
														   match={match}
														   markers={ markers }/>}
								   title="Контакты"
							/>
						</div>
					</CardContent>
				</Card>
				<ConfirmDialog
					open={this.state.isConfirmDialogOpened}
					message={this.state.company.message}
					title={this.state.company.title}
					okCallback={this.state.company.action}
					closeCallback={() => this.setState({ isConfirmDialogOpened: false })}/>
			</div>
		);
	}
}

const getMarkers = createSelector(
    [(state) => state.companyPage.company],
    (company) => {
    	const markers = [];
        if (company.locations) {
        	company.locations.forEach(location => {
        		markers.push({
                    position: location.position,
                    isOpen: false,
                    isMain: location.isMain,
				});
			});
		}
        return markers;
    }
);

const getCompany = createSelector(
	[state => state.companyPage.company],
	(company) => {
		let mainLocation = company.locations.find(location => (location.isMain === 1));
		if (!mainLocation) {
			if (company.locations.length > 0) {
				mainLocation = company.locations[0];
			}
		}


		return {
			...company,
			mainLocation,
		}
	}
);

const CompanyPage = connect(
	state => {
		return {
			common: state.common,
			company: getCompany(state),
			markers: getMarkers(state),
		}
	},
	{
		loadCompany,
		postFeedback,
		deleteFeedback,
		removeCompany,
	}
)(CompanyPageContainer);

export default CompanyPage;