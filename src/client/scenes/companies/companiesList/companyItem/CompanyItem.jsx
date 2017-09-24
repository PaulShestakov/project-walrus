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


@translate(['companiesList'])
@withStyles(styles)
export default class CompanyItem extends React.Component {
	render() {
		const {t, classes, className, company, ...other} = this.props;

		return (
			<Card className={classNames(classes.card, 'mt-3')}>
				<CardMedia className={classes.cardImage} image={'test'} />

				<CardContent className={classes.flexColumn}>
					<Label uppercase bold fontSize="2rem">{company.name}</Label>

					<div className={classNames(classes.flexRow, 'mt-4')}>
						<FontAwesome name="map-marker" className={classes.icon} />
						<Text>{company.lat + ' ' + company.lng}</Text>
					</div>

					<div className={classNames(classes.flexRow, 'mt-2')}>
						<div className={classNames(classes.flexRow, 'mr-3')}>
							<FontAwesome name="globe" className={classes.icon} />
							<Text>{company.url}</Text>
						</div>

						<div className={classes.flexRow}>
							<FontAwesome name="clock-o" className={classes.icon} />
							<Text>Working time</Text>
						</div>
					</div>

					<div className={classes.buttonsBlock}>
						<Button className="mr-2 text-white" bsSize="large" accent="white">
							{t('PHONES')}
						</Button>
						<Button className="mr-2 text-white" bsSize="large" accent="white">
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
