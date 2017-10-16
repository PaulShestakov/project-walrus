import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import styles from './styles';

import { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {Divider, Typography, Paper} from "material-ui";
import { Pets, Call, Mail, Public } from 'material-ui-icons';
import CompanyInfo from "./Info";
import Feedbacks from "./Feedback";

import {Route, Link} from 'react-router-dom'
import NewFeedback from "./Feedback/NewFeedback";


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
        let feedbacks = newProps.location.pathname.indexOf("/feedbacks");
        let feedback = newProps.location.pathname.indexOf("/feedback");
		let index;
		const { loadFeedbacks, match, history } = this.props;
        if (feedbacks !== -1) {
			index = 1;
			if (this.state.selectedTab !== index) {
				loadFeedbacks(match.params.companyId, history);
			}
		} else if (feedback !== -1) {
        	index = 2;
		} else {
        	index = 0;
		}
        this.setState({selectedTab: index});
    }

    handleTabPress = (event, index) => {
		this.setState({ selectedTab: index });
		const { match, history, loadFeedbacks } = this.props;
		const isFeedbacks = (index === 1);
		if (isFeedbacks) {
			loadFeedbacks(match.params.companyId, history);
		} else {
			history.push('/company/' + match.params.companyId);
		}
	};
	
	onPostFeedback = (data) => {
		const { companyId } = this.props.match.params;
		if (companyId) {
			data.companyId = companyId;
			this.props.postFeedback(data);
			this.props.loadFeedbacks(companyId, this.props.history);
		}
	};

	render() {
		const {t, classes, company, common, ...other} = this.props;

        const imageSrc = (company.logo ? company.logo : '').split('\\').join('\/');

		return (
			<Card raised className="my-4">
				<CardContent>
					<Grid container>
						<Grid item md={8}>
							<Typography type="headline" component="h2">
                                {company.name}
							</Typography>
							<Typography component="p">
                                {company.subcategoryName}
							</Typography>
						</Grid>
						<Grid item md={4}>
							<Link to={`${this.props.match.url}/feedback`} className={classes.link}>
								<Button accent="red" className='w-100'>
                                    {t('Оставить отзыв')}
								</Button>
							</Link>
						</Grid>
					</Grid>
					<Divider className="mt-4 mb-2" />
					<Grid container>
						<Grid item md={4}>
							<Paper className="d-flex justify-content-center">
								<CardMedia
									className={classes.cardImage}
									image={imageSrc}
								/>
							</Paper>
						</Grid>
						<Grid item md={8}>
							<Grid container className="d-flex-column h-100">
								{/* <Grid item className="d-flex align-items-center">
									<Pets className="mr-2"/>
									<Typography component="p">
										Empty
									</Typography>
								</Grid> */}
								<Grid item className="d-flex align-items-center">
									<Call className="mr-2"/>
									<Typography component="p">
										{company.phones ? company.phones.join(', ') : "Телефонов нет"}						
									</Typography>
								</Grid>
								<Grid item className="d-flex align-items-center">
									<Mail className="mr-2"/>
									<Typography component="p">
                                        {company.email}
									</Typography>
								</Grid>
								<Grid item className="d-flex align-items-center">
									<Public className="mr-2"/>
									<Typography component="p">
                                        {company.websiteUrl}
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
					</Tabs>
					<Divider />

					<Route exact path={`${this.props.match.url}`} render={(props) => <CompanyInfo company={company} /> }/>

					<Route exact path={`${this.props.match.url}/feedbacks`} 
						component={(props) => <Feedbacks feedbacks={this.props.feedbacks}/>}/>

					<Route path={`${this.props.match.url}/feedback`} render={() => <NewFeedback user={ common.user } onPostFeedback={this.onPostFeedback}/>}/>

				</CardContent>
			</Card>
		);
	}
}