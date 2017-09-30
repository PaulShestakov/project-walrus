import React from 'react';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card} from "components";
import CompanyItem from './companyItem/CompanyItem'
import Sidebar from './sidebar/Sidebar';
import classNames from 'classnames';
import styles from './styles';
import {Link} from "react-router-dom";


@translate(['companiesList'])
@withStyles(styles)
export default class CompaniesList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const searchParams = new URLSearchParams(this.props.location.search);
		this.props.updateStateWithUrlSource(searchParams);

		this.props.loadCompanies();
	}

	render() {
		const {t, classes, ...other} = this.props;

		return (
			<Grid container className="my-4">
				<Grid item md={9}>
					<Card className={classes.inputWrapper}>
						<Input placeholder={t('SECTION_SEARCH')} className={classNames(classes.searchInput, 'm-2', 'mt-3')} />
					</Card>
					{
                        this.props.main.companies && this.props.main.companies.map((company, index) => {
							return (
								<CompanyItem key={index} company={company} />
							);
						})
					}
				</Grid>

				<Grid item md={3}>
					<Sidebar
						history={this.props.history}
						filter={this.props.filter}

						cities={this.props.common.cities}
						addCity={this.props.addCity}
						removeCity={this.props.removeCity}

						daysOfWeek={this.props.common.daysOfWeek}
						addDayOfWeek={this.props.addDayOfWeek}
						removeDayOfWeek={this.props.removeDayOfWeek}

						updateUrlWithStateSource={this.props.updateUrlWithStateSource}

						loadCompanies={this.props.loadCompanies}
					/>
				</Grid>
			</Grid>
		);
	}
}