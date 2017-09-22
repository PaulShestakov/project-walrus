import React from 'react';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card} from "components";
import CompanyItem from './companyItem/CompanyItem'
import Sidebar from './sidebar/Sidebar';
import classNames from 'classnames';
import styles from './styles';


@translate(['companiesList'])
@withStyles(styles)
export default class CompaniesList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadCompanies();
	}

	render() {
		const {t, classes, ...other} = this.props;

		return (
			<Grid container className="mt-4">
				<Grid item md={9}>
					<Card>
						<Input placeholder={t('SECTION_SEARCH')}
							className={classNames(classes.searchInput, 'm-2', 'mt-3')} />
					</Card>
					{
						this.props.companies.map(company => {
							return (
								<CompanyItem {...company} />
							);
						})
					}
				</Grid>

				<Grid item md={3}>
					<Sidebar />
				</Grid>
			</Grid>
		);
	}
}