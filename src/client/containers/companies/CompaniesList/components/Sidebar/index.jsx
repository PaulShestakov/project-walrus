import React from 'react';
import FontAwesome from 'react-fontawesome';
import {translate} from 'react-i18next';
import {withStyles} from 'material-ui/styles';

import {
	Dropdown, Button,
	Label, Grid, ImageUploader,
	TextField, Tabs, Tab, Card, Popover,
	Checkbox, Separator
} from 'components';

import CheckboxesBlock from './Checkbox';
import Suggestion from './Suggestion';
import WorkingNow from './WorkingNow';

import classNames from 'classnames';
import styles from './styles';
import {Link} from 'react-router-dom';
import Authorized from '../../../../Authorized';
import assignments from '../config/assignments';
import description from '../config/componentDescription';

@translate(['companiesList'])
@withStyles(styles)
export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filters: []
		};
	}

	componentDidMount() {
		const { category, subcategory } = this.props;
		const foundCategory = assignments.find(a => a.categories.includes(category));
		const foundAssignment = assignments.find(a => a.subcategories.includes(subcategory));
		if (foundAssignment) {
			this.state.filters = foundAssignment.filters;
		} else if (foundCategory) {
			this.state.filters = foundCategory.filters;
		}
	}

    handleIsWorkingNowChange = (event, checked) => {
    	this.props.setIsWorkingNow(checked);
    	this.props.updateUrlWithStateSource(this.props.history);
    	this.props.loadCompanies();
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
    			<Card className={classNames(classes.card, 'mb-3 pb-3')}>
    				{
    					this.state.filters.map(filter => {
    						const { component, name } = filter;
    						if (component === 'suggestion') {
    							return <Suggestion props={this.props}
    								item={description[component][name]}/>;
    						} else if (component === 'checkbox') {
    							return <CheckboxesBlock props={this.props}
    								item={description[component][name]}/>;
    						} else if (component === 'workingNow') {
    							return <WorkingNow {...this.props}
    								handleIsWorkingNowChange={this.handleIsWorkingNowChange} />;
    						}
    					})
    				}
    			</Card>
    		</div>
    	);
    }
}