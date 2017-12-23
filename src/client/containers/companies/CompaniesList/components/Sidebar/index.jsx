import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';

import {
	Dropdown, Button,
	Label, Grid, ImageUploader,
	TextField, Tabs, Tab, Card, Popover,
	Checkbox, Separator, CheckboxesBlock
} from 'components';

import { PAGES, USER_ROLES } from '../../../../util/constants';

import classNames from 'classnames';
import styles from './styles';
import {Link} from 'react-router-dom';
import Authorized from '../../../../Authorized';
import assignments from '../../settings/assignments';
import description from '../../settings/filtersDescription';
import SearchSelect from '../../../../../components/SearchSelect/index';

import Switch from 'material-ui/Switch';

import { FormControlLabel, FormGroup } from 'material-ui/Form';
import { FILTER_TYPE } from '../../settings/constants';


@translate(['companiesList'])
@withStyles(styles)
export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
	}

	handleIsWorkingNowChange = (event, checked) => {
		this.props.setIsWorkingNow(checked);
		this.props.updateUrlWithStateSource(this.props.history);
		this.props.loadCompanies();
	};

	handleAddNewCompany = () => {
		if (this.props.user.role === USER_ROLES.ROLE_ADMIN) {
			this.props.history.push('/company/new');
		} else {
			window.location = PAGES.ADD_CATALOGS;
		}
	};

	render() {
		const {t, classes} = this.props;

		return (
			<div className={classes.flexColumn}>
				<Button
					accent="red"
					disableRipple={true}
					className="w-100 mb-2"
					onClick={this.handleAddNewCompany}>

					<FontAwesome name="plus" className="mr-1" /> Добавить компанию
				</Button>

				<Card className={classNames(classes.card, 'mb-3 p-3')}>
					{
						this.props.filterComponents.map(componentDescription => {
							const { title, showMoreLabel, name, type } = componentDescription;

							const enabled = this.props.filterValues[name].enabled;
							const value = this.props.filter.sidebarFilters[name];
							const allOptions = this.props.filterValues[name].values || [];

							switch (type) {
							case FILTER_TYPE.SUGGESTION: {
								return (
									<SearchSelect
										disabled={!enabled}
										className="mb-3"
										placeholder={title}
										value={value}
										suggestions={allOptions}
										onChange={(option) => {

											this.props.suggestionFilterChange(name, option.value);
											this.props.updateUrlWithStateSource(this.props.history);
											this.props.loadCompanies();
										}}
										handleSearch={(query) => this.props.handleSuggestionSearch(name, query)} />
								);
							}
							case FILTER_TYPE.CHECKBOX_BLOCK: {
								return (
									<CheckboxesBlock
										isEnabled={enabled}
										className="mb-3"
										formGroupName={name}
										title={title}
										showMoreLabel={showMoreLabel}
										numberOfItemsToShowDefault={4}
										items={allOptions}
										selectedIds={value || []}
										handleCheckboxPressed={event => {

											this.props.checkboxesBlockFilterChange(name, event.target.value, event.target.checked);
											this.props.updateUrlWithStateSource(this.props.history);
											this.props.loadCompanies();
										}} />
								);
							}

							case FILTER_TYPE.SWITCH: {
								return (
									<FormControlLabel
										classes={{
											label: classes.switchFormControlLabel
										}}
										className={classes.switchFormControlWrapper}
										control={
											<Switch
												checked={value === 'true'}
												onChange={(event, checked) => {

													this.props.switchFilterChange(name, checked);
													this.props.updateUrlWithStateSource(this.props.history);
													this.props.loadCompanies();

												}} />
										}
										label={title} />
								);
							}

							default:
								return null;
								//throw new Error('Unsupported filter component');
							}

						})
					}
				</Card>
			</div>
		);
	}
}

Sidebar.propTypes = {
	filterComponents: PropTypes.arrayOf(PropTypes.object)
};
