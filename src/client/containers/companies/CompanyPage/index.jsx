import React from 'react';
import {connect} from 'react-redux';
import { createSelector } from 'reselect'

import {loadCompany, postFeedback, loadFeedbacks, deleteFeedback} from "./actions";
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


@translate(['common'])
@withStyles(styles)
class CompanyPageContainer extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 0,
			isConfirmDialogOpened: false,
			company: {}
		};
	}

	componentDidMount() {
		const url_id = this.props.match.params.url_id;

		if (url_id) {
			this.props.loadCompany(url_id);
		}
	}

	componentWillReceiveProps(newProps) {
		const feedbacks = newProps.location.pathname.indexOf("/feedbacks");
		const feedback = newProps.location.pathname.indexOf("/feedback");
		const contacts = newProps.location.pathname.indexOf("/contacts");
		let index;
		const { loadFeedbacks, match, history } = this.props;
		if (feedbacks !== -1) {
			index = 1;
			if (this.state.selectedTab !== index) {
				loadFeedbacks(match.params.companyId, history);
			}
		} else if (feedback !== -1) {
			index = -1;
		} else if (contacts !== -1) {
			index = 2;
		} else {
			index = 0;
		}
		this.setState({selectedTab: index});
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
		const { match, history, loadFeedbacks } = this.props;
		if (index === 1) {
			loadFeedbacks(decodeURI(match.params.url_id), history);
		} else if (index === 2) {
			history.push('/company/' + match.params.url_id + '/contacts');
		} else {
			history.push('/company/' + match.params.url_id);
		}
	};

	deleteFeedback = (feedbackId) => {
		this.props.deleteFeedback({
			companyId: this.props.match.params.companyId,
			feedbackId
		}, this.props.history);
	};

	onPostFeedback = (data) => {
		const { companyId } = this.props.match.params;
		if (companyId) {
			data.companyId = companyId;
			this.props.postFeedback(data, this.props.history);
		}
	};

	delete = () => {
		this.setState({ isConfirmDialogOpened: false });
		this.props.removeCompany(this.state.company.companyId, this.props.history);
	};

	getImageSrc() {
		return encodeURI((this.props.company.logo || defaultCompanyImage).split('\\').join('\/'));
	}

	render() {
		const {t, classes, company, feedbacks, common, markers } = this.props;

		return (
			<div className={classes.mainCardWrapper}>
				<Card raised className={classNames(classes.mainCard, "my-4")}>
					<CardContent>
						<Grid container>
							<Grid item xs={8}>
								<Typography type="headline" component="h2">
									{company.name}
								</Typography>
								<Typography component="p">
									{company.subcategoryName}
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<Authorized allowedRoles={[5]}>
									<Link to={`${this.props.match.url}/feedback`} className={classes.link}>
										<Button accent="red" className='w-100'>
											{t('Оставить отзыв')}
										</Button>
									</Link>
								</Authorized>
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
								<Paper className="d-flex justify-content-center">
									<CardMedia
										className={classes.cardImage}
										image={this.getImageSrc()}
									/>
								</Paper>
							</Grid>
							<Grid item xs={8}>
								<Grid container
									  spacing={16}>
									<Grid item xs={12}
										  className="d-flex align-items-center">
										<Mail className="mr-2"/>
										<Typography component="p">
											{company.email}
										</Typography>
									</Grid>
									<Grid item xs={12}
										  className="d-flex align-items-center">
										<Public className="mr-2"/>
										<Typography component="p">
											<a href={company.url} target="_blank">
												{company.url}
											</a>
										</Typography>
									</Grid>
									<Grid item xs={12}>
										<Grid container
												spacing={16}>
											<Grid item xs={12}>
												<Typography component="p">
													Контакты главного офиса :
												</Typography>
											</Grid>
											<Grid item xs={12}
													className="d-flex align-items-center">
												<LocationOn className="mr-2"/>
												<Typography component="p">
													{company.mainLocation.address}
												</Typography>
											</Grid>
											<Grid item xs={12}
													className="d-flex align-items-center">
												<Call className="mr-2"/>
												<Typography component="p">
													{company.phonesText}
												</Typography>
											</Grid>
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
							<Tab label={t('Отзывы')}/>
							<Tab label={t('Адреса и контакты')}/>
						</Tabs>
						<Divider />
						<div className={classes.context}>
							<Route exact path={`${this.props.match.url}`}
								   render={() => <CompanyInfo company={ company } /> }/>

							<Route exact path={`${this.props.match.url}/feedbacks`}
								   render={() => <Feedbacks feedbacks={ feedbacks }
															deleteFeedback={ this.deleteFeedback }/>}/>


							<Route path={`${this.props.match.url}/feedback`}
								   render={() => <NewFeedback user={ common.user }
															  onPostFeedback={this.onPostFeedback}/>}/>

							<Route path={`${this.props.match.url}/contacts`}
								   render={() => <Contacts locations={ company.locations }
														   markers={ markers }/>}/>
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
			} else {
				mainLocation = {
					workingTimes: [],
					phones: []
				}
			}
		}
		const phonesText = mainLocation.phones ? mainLocation.phones.map(p => (p.phone)).join(', ') : "Телефонов нет";

		return {
			...company,
			mainLocation,
			phonesText
		}
	}
);

const CompanyPage = connect(
	state => {
		return {
			common: state.common,
			company: getCompany(state),
			feedbacks: state.companyPage.feedbacks,
			markers: getMarkers(state),
		}
	},
	{
		loadCompany,
		postFeedback,
		loadFeedbacks,
		deleteFeedback,
		removeCompany,
	}
)(CompanyPageContainer);

export default CompanyPage;