import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import styles from './styles';

import { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {Divider, Typography, Paper} from "material-ui";
import { Pets, Call, Mail, Public } from 'material-ui-icons';
import CompanyInfo from "./Info";
import Feedbacks from "./Feedback";
import defaultCompanyImage from '../../../assets/img/company-default.png';

import {Route, Link} from 'react-router-dom'
import NewFeedback from "./Feedback/NewFeedback";
import Contacts from "./Contacts/index";
import Authorized from "../../../containers/Authorized";


@translate(['common'])
@withStyles(styles)
export default class CompanyPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 0
		};
	}

    componentDidMount() {
        const companyId = this.props.match.params.companyId;

        if (companyId) {
			this.props.loadCompany(companyId);
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

    handleTabPress = (event, index) => {
		this.setState({ selectedTab: index });
		const { match, history, loadFeedbacks } = this.props;
		if (index === 1) {
			loadFeedbacks(match.params.companyId, history);
		} else if (index === 2) {
            history.push('/company/' + match.params.companyId + '/contacts');
		} else {
			history.push('/company/' + match.params.companyId);
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

	render() {
		const {t, classes, company, feedbacks, common, ...other} = this.props;

        const imageSrc = (company.logo ? company.logo : defaultCompanyImage).split('\\').join('\/');

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
								<Link to={`${this.props.match.url}/feedback`} className={classes.link}>
									<Button accent="red" className='w-100'>
										{t('Оставить отзыв')}
									</Button>
								</Link>
							</Grid>
						</Grid>
						<Divider className="mt-4 mb-2" />
						<Grid container>
							<Grid item xs={4}>
								<Paper className="d-flex justify-content-center">
									<CardMedia
										className={classes.cardImage}
										image={imageSrc}
									/>
								</Paper>
							</Grid>
							<Grid item xs={8}>
								<Grid container className="d-flex-column h-100">
									{/*<Grid item className="d-flex align-items-center">*/}
										{/*<Call className="mr-2"/>*/}
										{/*<Typography component="p">*/}
											{/*{company.phones ? company.phones.join(', ') : "Телефонов нет"}						*/}
										{/*</Typography>*/}
									{/*</Grid>*/}
									<Grid item className="d-flex align-items-center">
										<Mail className="mr-2"/>
										<Typography component="p">
											{company.email}
										</Typography>
									</Grid>
									<Grid item className="d-flex align-items-center">
										<Public className="mr-2"/>
										<Typography component="p">
											<a href={company.url} target="_blank">
												{company.url}
											</a>
										</Typography>
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

						<Route exact path={`${this.props.match.url}`}
							   render={() => <CompanyInfo company={ company } /> }/>

						<Route exact path={`${this.props.match.url}/feedbacks`}
							   render={() => <Feedbacks feedbacks={ feedbacks }
														deleteFeedback={ this.deleteFeedback }/>}/>

						<Authorized allowedRoles={[1]}>
							<Route path={`${this.props.match.url}/feedback`}
								   render={() => <NewFeedback user={ common.user }
															  onPostFeedback={this.onPostFeedback}/>}/>
						</Authorized>

						<Route path={`${this.props.match.url}/contacts`}
							   render={() => <Contacts locations={ company.locations } />}/>

					</CardContent>
				</Card>
			</div>
		);
	}
}