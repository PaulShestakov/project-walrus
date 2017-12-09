import React from 'react';
import {connect} from 'react-redux';
import { createSelector } from 'reselect';

import FontAwesome from 'react-fontawesome';

import {loadCompany, postFeedback, deleteFeedback, onComponentLeave} from './actions';
import { removeCompany } from '../CompaniesList/actionCreators/companiesList';

import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, ConfirmDialog, InfoDialog } from 'components';
import styles from './styles';

import { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {Divider, Typography, Paper} from 'material-ui';
import { Pets, Call, Mail, Public, LocationOn, ModeEdit as ModeEditIcon, DeleteForever as Delete, Block } from 'material-ui-icons';
import CompanyInfo from './components/Info/index';
import Feedbacks from './components/Feedback/index';
import defaultCompanyImage from '../../../assets/img/company-default.png';

import { Link } from 'react-router-dom';
import {Route } from 'react-router';
import NewFeedback from './components/Feedback/NewFeedback/index';
import Contacts from './components/Contacts/index';
import Authorized from '../../../containers/Authorized';
import Util from '../../util/index';
import { CircularProgress } from 'components';

import { PAGES, USER_ROLES } from '../../util/constants';


@translate(['common'])
@withStyles(styles)
class CompanyPageContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 0,
			isConfirmDialogOpened: false,
			isPhonesDialogOpened: false,
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

	componentWillUnmount() {
		this.props.onComponentLeave();
	}

	componentWillReceiveProps(newProps) {
		const lastWord = newProps.location.pathname.split('/').slice(-1)[0];
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

	handleOpenPhonesDialog = (phones) => {
		this.setState({
			isPhonesDialogOpened: true,
			phones
		});
	};

	handleAction = (company, action) => {
		let value = undefined;
		if (action === 'delete') {
			value = {
				companyId: company.companyId,
				action: this.handleDelete,
				title: 'Удаление компании',
				message: `Вы действительно хотите удалить ${company.name}?`,
			};
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
			redirectUrl: match.url + '/feedbacks',
			companyId: company.companyId,
			url_id: company.url_id,
			feedbackId
		}, history);
	};

	onPostFeedback = (data) => {
		const { postFeedback, history, match } = this.props;
		data.redirectUrl = match.url + '/feedbacks';
		data.url_id = match.params.url_id;
		postFeedback(data, history);
	};

	handleLeaveFeedback = () => {
		if ([USER_ROLES.ROLE_USER, USER_ROLES.ROLE_ADMIN].includes(this.props.common.user.role)) {
			this.props.history.push(`${this.props.match.url}/feedback`);
		} else {
			window.location = PAGES.LOGIN_PAGE;
		}
	};

	handleDelete = () => {
		this.setState({ isConfirmDialogOpened: false });
		this.props.removeCompany(this.state.company.companyId, this.props.history);
	};

	render() {
		const {t, classes, company, common, markers, match, isLoading } = this.props;
		const { locationToDisplay } = this.state;

		if (isLoading) {
			return <CircularProgress />;
		}

		let companyName = company.name;
		if (locationToDisplay && locationToDisplay.cityName) {
			companyName += ' г. ' + locationToDisplay.cityName;
		}
		const socialLinks = [
			{link: company.vk, image: 'vk'},
			{link: company.facebook, image: 'facebook'},
			{link: company.instagram,image: 'instagram'}
		].map(item => {
			if (item.link) {
				return (
					<Grid item={true}>
						<a href={item.link} target="_blank" rel="nofollow">
							<FontAwesome name={item.image}
								className={classes.greyIcon} />
						</a>
					</Grid>
				);
			}
		});

		return (
			<div className={classes.mainCardWrapper}>
				<Card raised={true} className={classNames(classes.mainCard, 'my-3')}>
					<CardContent>
						<Grid container={true}>
							<Grid item={true} xs={8}>
								<Typography type="headline" component="h2">
									{companyName}
								</Typography>
								<Typography component="p">
									{company.subcategoryName}
								</Typography>
							</Grid>
							<Grid item={true} xs={4}>
								{
									locationToDisplay &&
									<Button accent="red" className="w-100" onClick={this.handleLeaveFeedback}>
										{t('Оставить отзыв')}
									</Button>
								}
								<Authorized
									allowedRoles={[1]}
									className={classes.editButtonsBlock}>
									<Button fab={true} className={classes.editButton}>
										<Link to={`/company/edit/${company.url_id}`}>
											<ModeEditIcon className={classes.editIcon} />
										</Link>
									</Button>
									<Button fab={true} className={classes.editButton}
										onClick={this.handleAction.bind(null, company, 'delete')}>
										<Delete className={classes.editIcon} />
									</Button>
								</Authorized>
							</Grid>
						</Grid>

						<Divider className="mt-4 mb-4" />

						<Grid container={true}>
							<Grid item={true} xs={4}>
								<Paper className="mx-auto h-100">
									<CardMedia
										className={classes.cardImage}
										image={Util.encodeUrl(company.logo, defaultCompanyImage)} />
								</Paper>
							</Grid>
							<Grid item={true} xs={8}>
								<Grid container={true} spacing={16}>
									{
										company.email &&
										<Grid item={true} xs={12} className="d-flex align-items-center">
											<Mail className="mr-2" />
											<Typography component="p">
												{company.email}
											</Typography>
										</Grid>
									}
									{
										company.url &&
										<Grid item={true} xs={12} className="d-flex align-items-center">
											<Public className="mr-2" />
											<Typography component="p">
												<a href={company.url} target="_blank" rel="nofollow">
													{company.url}
												</a>
											</Typography>
										</Grid>
									}
									<Grid item={true} xs={12}>
										<Grid container={true} spacing={16}>
											{
												locationToDisplay && locationToDisplay.address &&
												<Grid item={true} xs={12} className="d-flex align-items-center">
													<LocationOn className="mr-2" />
													<Typography component="p">
														{locationToDisplay.address}
													</Typography>
												</Grid>
											}
											{
												locationToDisplay &&
												<Grid item={true} xs={12}>
													<Button className="mr-2 mt-2 text-white" accent="white"
														onClick={this.handleOpenPhonesDialog.bind(null, locationToDisplay.phones)}>
														Телефоны
													</Button>
												</Grid>
											}
											{
												socialLinks.length > 0 &&
												<Grid item={true} xs={12}>
													<Grid container={true}>
														{socialLinks}
													</Grid>
												</Grid>
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
							<Tab label={t('Инфо')} />
							<Tab label={t('Отзывы')} disabled={!locationToDisplay} />
							<Tab label={t('Адреса и контакты')} />
						</Tabs>

						<Divider />

						<div className={classes.context}>
							<Route exact={true} path={`${this.props.match.url}`}
								   render={() => <CompanyInfo company={company} />}
								   title="Информация о компании" />

							<Route exact={true} path={`${this.props.match.url}/feedbacks`}
									render={() => (<Feedbacks feedbacks={locationToDisplay ? locationToDisplay.feedbacks : []}
									deleteFeedback={this.deleteFeedback} />)} />


							<Route path={`${this.props.match.url}/feedback`}
								   render={() => (
									   <Authorized
										   allowedRoles={[1,2,3,4]}
										   unauthorizedAction={() => window.location = PAGES.LOGIN_PAGE}>
										   <NewFeedback
											   user={common.user}
											   companyInfo={{
												   companyId: company.companyId,
												   locationId: locationToDisplay ? locationToDisplay.locationId : null
											   }}
											   onPostFeedback={this.onPostFeedback} />
									   </Authorized>
								   )} />

							<Route exact={true} path={`${this.props.match.url}/contacts`}
								   render={() => (<Contacts locations={company.locations}
									match={match}
									history={this.props.history}
									markers={markers} />)} />
						</div>
					</CardContent>
				</Card>
				<ConfirmDialog
					open={this.state.isConfirmDialogOpened}
					message={this.state.company.message}
					title={this.state.company.title}
					okCallback={this.state.company.action}
					closeCallback={() => this.setState({ isConfirmDialogOpened: false })} />
				<InfoDialog
					open={this.state.isPhonesDialogOpened}
					title="Телефоны"
					message="Message"
					closeCallback={() => this.setState({ isPhonesDialogOpened: false })}>
					{
						this.state.phones && this.state.phones.map(item => (
							<div key={item.phoneId} className="mt-2">
								<Label>{item.phone}</Label>
							</div>
						))
					}
				</InfoDialog>
			</div>
		);
	}
}

CompanyPageContainer.displayName = 'CompanyPageContainer';

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
		};
	}
);

const CompanyPage = connect(
	state => {
		return {
			common: state.common,
			company: getCompany(state),
			markers: getMarkers(state),
			isLoading: state.companyPage.isLoading
		};
	},
	{
		loadCompany,
		postFeedback,
		deleteFeedback,
		removeCompany,
		onComponentLeave
	}
)(CompanyPageContainer);


export default CompanyPage;
