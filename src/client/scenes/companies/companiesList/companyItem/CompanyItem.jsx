import React from 'react';
import {translate} from 'react-i18next';
import {Link} from 'react-router-dom';
import {Grid, Title, Button, Label, Textarea, TextField, Input, Text} from 'components';
import {withStyles} from 'material-ui/styles';
import Card, {CardMedia, CardContent} from 'material-ui/Card';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import styles from './styles';
import {Paper} from "material-ui";
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';


@translate(['companiesList'])
@withStyles(styles)
export default class CompanyItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isWorkingTimeDialogOpened: false
		};
	}

	handleOpenWorkingTimeDialog = () => {
		this.setState({
			isWorkingTimeDialogOpened: true
		})
	};

	handleCloseWorkingTimeDialog = () => {
		this.setState({
			isWorkingTimeDialogOpened: false
		})
	};

	render() {
		const {t, classes, className, company, ...other} = this.props;
        const imageSrc = company.logo ? company.logo : '';

		return (
			<Card className={classNames(classes.card, 'mt-3', 'p-4')}>
				<Link to={`/company/${company.companyId}`}>
					<Paper>
						<CardMedia className={classes.cardImage} image={imageSrc} />
					</Paper>
				</Link>

				<CardContent className={classNames(classes.flexColumn, 'p-0', 'pl-4')}>
					<Label uppercase bold fontSize="2rem">{company.name}</Label>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						{
							company.locations.map(location => {
								return (
									<div className={classes.flexRow}>
										<FontAwesome name="map-marker" className={classes.icon} />
										<Text>{location.cityName + ': ' + location.address}</Text>
									</div>
								);
							})
						}
					</div>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						<FontAwesome name="globe" className={classes.icon} />
						<Text>{company.websiteUrl}</Text>
					</div>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						<FontAwesome name="phone" className={classes.icon} />
						<Text>{company.phones ? company.phones.map(item => item.phone).join(', ') : 'Телефонов нет'}</Text>
					</div>

					{/*<div className={classNames(classes.flexRow, 'mt-1')}>*/}
						{/*<FontAwesome name="clock-o" className={classes.icon} />*/}
						{/*<Text>Working time</Text>*/}
					{/*</div>*/}

					<div className={classes.buttonsBlock}>
						<Button className="mr-2 text-white" onClick={this.handleOpenWorkingTimeDialog} bsSize="large" accent="white">
							{t('WORKING_TIME')}
						</Button>
						<Dialog open={this.state.isWorkingTimeDialogOpened} onRequestClose={this.handleCloseWorkingTimeDialog}>
							<DialogTitle>{t('WORKING_TIME')}</DialogTitle>
							<DialogContent>
								Working time
							</DialogContent>
							<DialogActions>
								<Button onClick={this.handleCloseWorkingTimeDialog} color="primary">
									{t('CLOSE')}
								</Button>
							</DialogActions>
						</Dialog>


						<Button className="mr-2 text-white" bsSize="large" accent="red">
							{t('CALL')}
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}
}
