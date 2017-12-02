import React from 'react';
import FontAwesome from 'react-fontawesome';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';

import {
	Dropdown, Button,
	Label, Grid, ImageUploader,
	TextField, Tabs, Tab, Card, Popover,
	Checkbox, Separator, CheckboxesBlock
} from 'components';



import classNames from 'classnames';
import styles from './styles';
import {Link} from 'react-router-dom';
import Authorized from '../../../../Authorized';
import assignments from '../../settings/assignments';
import description from '../../settings/componentDescription';
import SearchSelect from '../../../../../components/SearchSelect/index';

@translate(['companiesList'])
@withStyles(styles)
export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);

		// Find appropriate filters config
		let filters = this.getFilters(props);

		this.state = {
			filters
		};

		this.props.setupInitialFilterState(filters.map(filter => description[filter.component][filter.name]));
	}

	getFilters(props) {
		let filters;
		const { category, subcategory } = props;

		const foundCategory = assignments.find(a => a.categories.includes(category));
		const foundAssignment = assignments.find(a => a.subcategories.includes(subcategory));

		if (foundAssignment) {
			filters = foundAssignment.filters;
		} else if (foundCategory) {
			filters = foundCategory.filters;
		}
		return filters;
	}

    handleIsWorkingNowChange = (event, checked) => {
    	this.props.setIsWorkingNow(checked);
    	this.props.updateUrlWithStateSource(this.props.history);
    	this.props.loadCompanies();
    };

	handleChange = (name, value) => {

	};



	render() {
    	const {t, classes} = this.props;

    	return (
    		<div className={classes.flexColumn}>
    			<Authorized allowedRoles={[5]}>
    				<Link to="/company/new" className={classes.link}>
    					<Button accent="red" disableRipple={true} className="w-100 mb-2">
    						<FontAwesome name="plus" className="mr-1" />
                            Добавить компанию
    					</Button>
    				</Link>
    			</Authorized>


    			<Card className={classNames(classes.card, 'mb-3 p-3')}>
    				{
    					this.state.filters.map(filter => {
    						const { component, name } = filter;


							const title = description[component][name].title;
							const enabled = this.props.filterValues[name].enabled;

							const value = this.props.filter.sidebarFilters[name];
							const allOptions = this.props.filterValues[name].values || [];



							switch (component) {
							case 'suggestion': {
								return (
									<SearchSelect
										disabled={!enabled}
										className="mb-3"
										placeholder={title}
										value={value}
										suggestions={allOptions}
										onChange={(option) => this.props.suggestionFilterChange(name, option.value)}
										handleSearch={(query) => this.props.handleSuggestionSearch(name, query)}/>
								);
							}
							case 'checkbox': {
								return (
									enabled &&
									<CheckboxesBlock
										className="mb-3"
										formGroupName={name}
										title={title}
										showMoreLabel={'more'}
										numberOfItemsToShowDefault={4}
										items={allOptions}
										selectedIds={value || []}
										handleCheckboxPressed={event => {
											this.props.checkboxesBlockFilterChange(name, event.target.value, event.target.checked);
										}}
									/>
								);
							}


							// case 'checkbox':{
							// 	return <CheckboxesBlock props={this.props} item={description[component][name]} />;
							// }
							//
							// case 'switch': {
							// 	return <WorkingNow {...this.props} handleIsWorkingNowChange={this.handleIsWorkingNowChange} />;
							// }

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