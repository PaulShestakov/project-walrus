import React from 'react';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card} from "components";
import classNames from 'classnames';
import styles from './styles';


@translate(['companiesList'])
@withStyles(styles)
export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {t, classes, ...other} = this.props;

		return (
			<Card className="p-3">
				<Title uppercase>{t('CITY')}</Title>
			</Card>
		);
	}
}