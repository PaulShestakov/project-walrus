import React from 'react';
import FontAwesome from 'react-fontawesome';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';
import {Dropdown, Button, Label, Grid, ImageUploader, TextField, Tabs, Tab, Card, Popover, Checkbox, Separator, CheckboxesBlock} from "components";
import { FormControlLabel } from 'material-ui/Form';
import classNames from 'classnames';
import styles from './styles';
import {Link} from "react-router-dom";
import {Switch} from "material-ui";


@translate(['companiesList'])
@withStyles(styles)
export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	handleCheckboxPressed = (event) => {
		switch(event.target.name) {
			case 'cities': {
				if (event.target.checked) {
					this.props.addCity(event.target.value);
				} else {
					this.props.removeCity(event.target.value);
				}
				break;
			}
		}
		this.props.updateUrlWithStateSource(this.props.history);
		this.props.loadCompanies();
	};

	handleIsWorkingNowChange = (event, checked) => {
		this.props.setIsWorkingNow(checked);
		this.props.updateUrlWithStateSource(this.props.history);
		this.props.loadCompanies();
	};


	render() {
		const {t, classes} = this.props;

		return (
			<div className={classes.flexColumn}>
				<Link to="/company/new" className={classNames(classes.link, 'mb-2')}>
					<Button accent="red" disableRipple={true} className="w-100">
						<FontAwesome name="plus" className="mr-1" />
						Добавить компанию
					</Button>
				</Link>

				<Card className={classNames(classes.card, 'mb-3 pb-3')}>
					<CheckboxesBlock
						formGroupName="cities"
						title={t('LOCATION')}
						showMoreLabel={t('ALL_CITIES')}
						numberOfItemsToShowDefault={6}
						items={this.props.cities}
						selectedIds={this.props.filter.selectedCitiesIds}
						handleCheckboxPressed={this.handleCheckboxPressed}
					/>

					<div>
						<FormControlLabel className={classNames(classes.switchFormControlWrapper, "m-3")}
							control={
								<Switch
									checked={this.props.filter.isWorkingNow}
									onChange={this.handleIsWorkingNowChange}
								/>
							}
							label={t('WORKING_NOW')}
						/>
					</div>
				</Card>
			</div>
		);
	}
}