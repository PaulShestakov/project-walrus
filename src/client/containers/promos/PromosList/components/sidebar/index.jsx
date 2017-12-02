import * as React from "react";
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import {translate} from "react-i18next";
import { Button, Card, Label, Separator, Checkbox, Dropdown, Grid, Popover, Title, ButtonMore } from "components";

import { FormGroup, FormControlLabel } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';

import styles from './styles';
import CheckboxesBlock from "../../../../../components/CheckboxesBlock/index";


import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

@translate(['promos'])
@withStyles(styles)
export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
    }

	handleAnimalSelected = event => {
		this.props.setAnimal(event.target.value);
		this.props.updateUrlWithStateSource(this.props.history);
		this.props.loadBreeds(event.target.value);
		this.props.loadPromos();
	};

	handleCheckboxPressed = (event) => {
		switch(event.target.name) {
			case 'breeds': {
				if (event.target.checked) {
					this.props.addBreed(event.target.value);
				} else {
					this.props.removeBreed(event.target.value);
				}
				break;
			}
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
		this.props.loadPromos();
	};

    render() {
        const { t, classes, ...other } = this.props;

        return (
        	<Grid container direction="column" { ...other }>

				<Grid item md={12}>
					<Button accent="red" disableRipple={true} className='w-100'>
						<Link to="/newPromo" className={classes.link}>
							<FontAwesome name="plus" className="mr-1" />
							{t('CREATE_PROMO')}
						</Link>
					</Button>
				</Grid>


				<Grid item md={12}>
					<Card className={classNames(classes.card, 'mb-3')}>
						<Label uppercase bold fontSize="1.5rem" className="m-3 mt-4">{t('SELECT_ANIMAL')}</Label>
						<Separator />
						<FormControl className={classNames(classes.selectWrapper, "m-3")}>
							<InputLabel htmlFor="animal">{t('ANIMAL')}</InputLabel>
							<Select
								value={this.props.filter.selectedAnimalId}
								onChange={this.handleAnimalSelected}
								input={
									<Input id="animal" />
								}>
								<MenuItem value="ALL">{t('ALL')}</MenuItem>
								{
									this.props.animals.map(animal => (
										<MenuItem value={animal.value}>{animal.label}</MenuItem>
									))
								}
							</Select>
						</FormControl>
						<Separator />

						{
							this.props.filter.breedsAreLoaded &&
							<CheckboxesBlock
								formGroupName="breeds"
								title={t('SELECT_BREED')}
								showMoreLabel={t('ALL_BREEDS')}

								numberOfItemsToShowDefault={4}

								items={this.props.filter.breeds}
								selectedIds={this.props.filter.selectedBreedsIds}

								handleCheckboxPressed={this.handleCheckboxPressed}
							/>
						}

						<CheckboxesBlock
							formGroupName="cities"
							title={t('SELECT_LOCATION')}
							showMoreLabel={t('ALL_CITIES')}

							numberOfItemsToShowDefault={4}

							items={this.props.cities}
							selectedIds={this.props.filter.selectedCitiesIds}

							handleCheckboxPressed={this.handleCheckboxPressed}
						/>
					</Card>
				</Grid>
			</Grid>
		)
	}
}