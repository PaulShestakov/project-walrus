import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import styles from './styles';


@translate(['common'])
@withStyles(styles)
export default class CompanyPage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {t, classes, ...other} = this.props;

		return (
			<Grid md={12} container>
				<Grid item>
					CompanyPage
				</Grid>
			</Grid>
		);
	}
}