import React from 'react';
import {translate} from 'react-i18next';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Grid, Title, Button, Label, Textarea, TextField, Input, Text} from 'components';
import {withStyles} from 'material-ui/styles';
import Card, {CardHeader, CardMedia, CardContent, CardActions} from 'material-ui/Card';
import classNames from 'classnames';
import styles from './styles';


@translate(['common'])
@withStyles(styles)
export default class CompanyItem extends React.Component {
	render() {
		const {t, classes, className, description, name, ...other} = this.props;

		return (
			<Card className={classNames(className, 'mt-3')}>
				<CardMedia className={classes.cardImage} image={'test'} />
				<CardContent>
					{name}
				</CardContent>
			</Card>
		);
	}
}
