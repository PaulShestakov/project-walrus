import * as React from "react";
import FontAwesome from 'react-fontawesome';
import {translate} from "react-i18next";
import { Button, Card, Label, Separator, Checkbox, Dropdown, Grid, Popover } from "components";

import { FormGroup, FormControlLabel } from 'material-ui/Form';


@translate(['promos'])
export default class SideBar extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
			anchorEl: undefined,
			open: false,
		};

        this.filter = this.props.filter;
    }


	handleRequestClose = () => {
		this.setState({ open: false });
	};

	handleClick = event => {
		this.setState({ open: !this.state.open, anchorEl: event.currentTarget });
	};

	handlePopoverOuterAction = event => {

	};


    render() {
        const { t, ...other } = this.props;

		const allBreedsPopover = (
			<Card className="p-3">
				<FormGroup>
					{
						this.props.breeds && this.props.breeds.map((breed, index) => (
							<FormControlLabel label={breed.name} className="m-0" control={
								<Checkbox value={breed.id}
										  name="breeds"
										  checked={this.filter.breeds.indexOf(breed.id) !== -1}
										  onChange={this.props.onFilterChanged}
								/>
							} />
						))
					}
				</FormGroup>
			</Card>



		);
		//
		// const allCitiesPopover = (
         //    <Popover>
         //        <FormGroup row>
         //            {
         //                this.props.cities && this.props.cities.map((city, index) => (
         //                    <Grid item xs={6}>
         //                        <FormControlLabel styleName="formControlLabel" label={city.name} control={
         //                            <Checkbox value={city.id}
         //                                  name="cities"
         //                                  checked={this.filter.cities.indexOf(city.id) !== -1}
         //                                  onChange={this.props.onFilterChanged}
         //                            />
         //                        } />
         //                    </Grid>
         //                ))
         //            }
         //        </FormGroup>
         //    </Popover>
		// );


        return (
        	<Grid container direction="column" { ...other }>

				<Grid item md={12}>
					<Button href="/newPromo" accent="red" className="w-100 text-white">
						<FontAwesome name="plus" className="mr-1" />
						{t('CREATE_PROMO')}
					</Button>
				</Grid>


				<Grid item md={12}>
					<Card className="p-3">


						{/*<FormGroup>*/}
							{/*{*/}
								{/*this.props.animals &&*/}
								{/*this.props.animals.map((animal) => {*/}
									{/*const checked = this.filter.animals.indexOf(animal.id) !== -1;*/}

									{/*return (*/}
										{/*<Grid item xs={6}>*/}
											{/*<FormControlLabel className="m-0" label={animal.name} control={*/}
												{/*<Checkbox value={animal.id}*/}
														  {/*name="animals"*/}
														  {/*checked={checked}*/}
														  {/*onChange={this.props.onFilterChanged}*/}
												{/*/>*/}
											{/*}/>*/}
										{/*</Grid>*/}
									{/*)*/}
								{/*})*/}
							{/*}*/}
						{/*</FormGroup>*/}




						<FormGroup>
							{
								this.props.breeds &&
								this.props.breeds.map((breed) => {
										const checked = this.filter.breeds.indexOf(breed.id) !== -1;

										return (
											<Grid item xs={6}>
												<FormControlLabel className="m-0" label={breed.name} control={
													<Checkbox value={breed.id}
														name="breeds"
														checked={checked}
														onChange={this.props.onFilterChanged}
													/>
												}/>
											</Grid>
										)
									})
							}
						</FormGroup>



						<Popover isOpen={this.state.open}
							body={allBreedsPopover}
							preferPlace="left"
							onOuterAction={this.handlePopoverOuterAction}>
							<Button onClick={this.handleClick}/>
						</Popover>



						<Label className="mt-4">{t('LOCATION')}</Label>
						<FormGroup>
							{
								this.props.cities &&
								this.props.cities.slice(0, 4)
									.concat(
										this.props.cities.slice(4)
											.filter(city => this.filter.cities.indexOf(city.id) > -1)
									)
									.map((city, index) => {
										const checked = this.filter.cities.indexOf(city.id) !== -1;

										return (
											<Grid item xs={6}>
												<FormControlLabel className="m-0" label={city.name} control={
													<Checkbox value={city.id}
															  name="cities"
															  checked={checked}
															  onChange={this.props.onFilterChanged}
													/>
												}/>
											</Grid>
										)
									})
							}
						</FormGroup>



					</Card>
				</Grid>
			</Grid>
		)
	}
}