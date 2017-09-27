import React from 'react';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Grid, Title, Button, Label, Textarea, TextField, Input, Text} from 'components';
import {withStyles} from 'material-ui/styles';
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';
import styles from './styles';
import {Typography, Paper} from "material-ui";
import { Call } from 'material-ui-icons';


@translate(['companiesList'])
@withStyles(styles)
export default class CompanyItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showPhones: false,
			showTime: false
		};
	}

	render() {
		const {t, classes, className, company, ...other} = this.props;
        const imageSrc = company.logo ? company.logo : '';

		return (
			<Card className={classNames(classes.card, 'mt-3')}>
				<div className="p-4">
					<Link to={`/company/${company.companyId}`} className={classes.linkWrapper}>
						<Paper className="p-1">
							<CardMedia className={classes.cardImage} image={imageSrc} />
						</Paper>
					</Link>
				</div>
				<CardContent className={classes.flexColumn}>
					<Label uppercase bold fontSize="2rem">{company.name}</Label>

					<div className={classNames(classes.flexRow, 'mt-4')}>
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
						<div className={classNames(classes.flexRow, 'mr-3')}>
							<FontAwesome name="globe" className={classes.icon} />
							<Text>{company.websiteUrl}</Text>
						</div>

						{
							this.state.showTime &&
							<div className={classNames(classes.flexRow, 'mr-3')}>
								<FontAwesome name="clock-o" className={classes.icon} />
								<Text>Working time</Text>
							</div>
						}

						{
							this.state.showPhones && 
							<div className={classes.flexRow}>
								<FontAwesome name="phone" className={classes.icon} />
								<Text>{company.phones ? company.phones.map(item => item.phone).join(', ') : 'Телефонов нет'}</Text>
							</div>
						}
					</div>

					<div className={classes.buttonsBlock}>
						<Button className="mr-2 text-white" onClick={(event) => this.setState({ showPhones: !this.state.showPhones})} bsSize="large" accent="white">
							{t('PHONES')}
						</Button>
						<Button className="mr-2 text-white" onClick={(event) => this.setState({ showTime: !this.state.showTime})} bsSize="large" accent="white">
							{t('WORKING_TIME')}
						</Button>
						<Button className="mr-2 text-white" bsSize="large" accent="red">
							{t('CALL')}
						</Button>
					</div>
				</CardContent>
			</Card>
		);
	}
}
