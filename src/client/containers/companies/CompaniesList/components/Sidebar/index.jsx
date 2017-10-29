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
import Authorized from "../../../../Authorized";


@translate(['companiesList'])
@withStyles(styles)
export default class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			filters: [
				{
					name: 'cities',
					title: 'Местоположение',
                    showMoreLabel: 'Все города',
                    numberOfItemsToShowDefault: 6,
					getItems: (props) => props.cities,
					getSelectedIds: (props) => props.filter.selectedCitiesIds,
				},
				{
					name: 'subways',
					title: 'Метро',
					showMoreLabel: 'Все станции метро',
                    numberOfItemsToShowDefault: 4,
                    getItems: (props) => props.subways,
                    getSelectedIds: (props) => props.filter.selectedSubwaysIds,
				},
				{
                    name: 'animals',
                    title: 'Животные',
                    showMoreLabel: 'Все животные',
                    numberOfItemsToShowDefault: 4,
                    getItems: (props) => props.animals,
                    getSelectedIds: (props) => props.filter.selectedAnimalsIds,
				},
                {
                    name: 'breeds',
                    title: 'Породы',
                    showMoreLabel: 'Все породы',
                    numberOfItemsToShowDefault: 4,
                    getItems: (props) => props.breeds,
                    getSelectedIds: (props) => props.filter.selectedBreedsIds,
                }
			]
		};
	}

	handleIsWorkingNowChange = (event, checked) => {
		this.props.setIsWorkingNow(checked);
		this.props.updateUrlWithStateSource(this.props.history);
		this.props.loadCompanies();
	};


	render() {
		const {t, classes, handleCheckboxPressed} = this.props;

		return (
			<div className={classes.flexColumn}>
				<Authorized
					allowedRoles={[3]}>
					<Link to="/company/new" className={classNames(classes.link, 'mb-2')}>
						<Button accent="red" disableRipple={true} className="w-100">
							<FontAwesome name="plus" className="mr-1" />
							Добавить компанию
						</Button>
					</Link>
				</Authorized>
				<Card className={classNames(classes.card, 'mb-3 pb-3')}>
					{
						this.state.filters.map((filter, index) => {
							const items = filter.getItems(this.props);
							return (
								items.length > 0 &&
								<CheckboxesBlock
									key={index}
									formGroupName={filter.name}
									title={filter.title}
									showMoreLabel={filter.showMoreLabel}
									numberOfItemsToShowDefault={filter.numberOfItemsToShowDefault}
									items={items}
									selectedIds={filter.getSelectedIds(this.props)}
									handleCheckboxPressed={handleCheckboxPressed}/>
							)
						})
					}
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