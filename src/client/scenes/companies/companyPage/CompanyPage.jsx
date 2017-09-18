import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import styles from './styles';

import { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {Divider, Typography} from "material-ui";


@translate(['common'])
@withStyles(styles)
export default class CompanyPage extends React.Component {

	constructor(props) {
		super(props);
	}

    componentDidMount() {
        const companyId = this.props.match.params.companyId;

        if (companyId) {
            this.props.loadCompany(companyId);
        }
    }

	render() {
		const {t, classes, company, ...other} = this.props;

        const imageSrc = company.logo ? company.logo : '';

		return (
			<Grid container className="mt-4" spacing={16}>
				<Grid item md={12}>
					<Card>
						<CardContent>
							<Typography type="headline" component="h2">
								{company.name}
							</Typography>
							<Typography component="p">
                                {company.description}
							</Typography>
						</CardContent>
						<Divider />
						<CardMedia
							className={classes.cardImage}
							image={imageSrc}
						/>
						<Divider />
						CompanyPage {company.logo}
					</Card>
				</Grid>
			</Grid>
		);
	}
}