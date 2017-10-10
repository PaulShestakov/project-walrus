import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import styles from './styles';
import {Divider, Typography, Paper} from "material-ui";


@translate(['common'])
@withStyles(styles)
export default class EditCompany extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: '',
		}
	}

	componentDidMount() {
		const companyId = this.props.match.params.companyId;
		if (companyId) {
			this.props.loadCompany(companyId);
		}
	}

	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleCategoryChange = (option) => {
		const category = this.props.common.companiesCategories.find((category) => {
			return category.value === option.value;
		});
		const subcategories = category.subcategories;
		this.setState({
			selectedCategory: option,
			subcategories: subcategories,
			selectedSubcategory: subcategories[0]
		});
	};

	render() {
		const {t, classes, common, ...other} = this.props;

		return (
			<Grid container justify="center" spacing={0} className="my-4">
				<Grid item xs={9}>
					<Card className="py-4 px-3">
						<Grid container direction="column" spacing={24}>
							<Grid item>
								<Typography type="headline" component="h1" className="mt-4">
									Основная информация
								</Typography>
							</Grid>

							<Grid item>
								<Title>Название</Title>
								<Input fullWidth name="companyName"
									   placeholder="Название компании"
									   className="mt-2"
									   value={this.state.value}
									   onChange={this.handleInputChange} />
							</Grid>
							<Grid item>
								<Title>Категория</Title>
								<Dropdown name="companyCategoryId"
									value={this.state.selectedCategory.label}
									onChange={this.handleCategoryChange}
									options={this.state.categories}
									className="mt-2"/>
							</Grid>
						</Grid>
						{/*<Grid item xs={8}>*/}
							{/*<Title>Подкатегория</Title>*/}
							{/*<Dropdown name="companySubcategoryId"*/}
									  {/*onChange={(option) => this.setState({  selectedSubcategory : option })}*/}
									  {/*value={this.state.selectedSubcategory.label}*/}
									  {/*options={this.state.subcategories}*/}
									  {/*className="mt-2"/>*/}
						{/*</Grid>*/}

						{/*<Grid item xs={8}>*/}
							{/*<Title>Ссылка на лого</Title>*/}
							{/*<Input name="logo" placeholder="Лого" fullWidth className="mt-2"/>*/}
						{/*</Grid>*/}

						{/*<Grid item xs={8}>*/}
							{/*<Title>Картинка лого</Title>*/}
							{/*<ImageUploader className="mt-4"*/}
										   {/*imageObjects={this.state.imageObjects}*/}
										   {/*onImageAdd={(object) => this.setState({ imageObjects: [object] })}*/}
										   {/*onImageDelete={() => this.setState({ imageObjects: [] })}/>*/}
						{/*</Grid>*/}

						{/*<Grid item xs={8}>*/}
							{/*<Title>Описание</Title>*/}
							{/*<TextField name="description"*/}
									   {/*multiline*/}
									   {/*rowsMax="10"*/}
									   {/*placeholder="Описание"*/}
									   {/*fullWidth*/}
									   {/*className="mt-2"/>*/}
						{/*</Grid>*/}
						{/*<Grid item xs={8}>*/}
							{/*<Title>Сайт компании</Title>*/}
							{/*<Input name="url" placeholder="Сайт" fullWidth className="mt-2"/>*/}
						{/*</Grid>*/}
						{/*<Grid item xs={8}>*/}
							{/*<Title>Email</Title>*/}
							{/*<Input name="email" placeholder="Email" fullWidth className="mt-2"/>*/}
						{/*</Grid>*/}
						{/*<Grid item xs={8}>*/}
							{/*<Title>Телефоны</Title>*/}
							{/*<Input name="phones" placeholder="Телефоны" fullWidth className="mt-2"/>*/}
						{/*</Grid>*/}
						{/*<Grid item xs={8}>*/}
							{/*<Typography type="headline" component="h1" className="mt-4">*/}
								{/*Местоположение*/}
							{/*</Typography>*/}
						{/*</Grid>*/}

						{/*<Grid item xs={8}>*/}
							{/*<Title>Город</Title>*/}
							{/*<Dropdown name="city"*/}
									  {/*onChange={(option) => this.setState({  selectedCity: option })}*/}
									  {/*value={this.state.selectedCity.label}*/}
									  {/*options={this.props.common.cities}*/}
									  {/*className="mt-2"/>*/}
						{/*</Grid>*/}

						{/*<Grid item xs={8}>*/}
							{/*<Title>Метро</Title>*/}
							{/*<Dropdown name="subway"*/}
									  {/*onChange={(option) => this.setState({  selectedSubway: option })}*/}
									  {/*value={this.state.selectedSubway.label}*/}
									  {/*options={this.props.common.subway}*/}
									  {/*className="mt-2"/>*/}
						{/*</Grid>*/}

						{/*<Grid item xs={8}>*/}
							{/*<Title>Адрес</Title>*/}
							{/*<Input name="address" placeholder="Адрес" fullWidth className="mt-2" onChange={(event) => this.setState({ address: event.target.value })}/>*/}
						{/*</Grid>*/}

						{/*<Grid item xs={8}>*/}
							{/*<Title>Карта</Title>*/}
							{/*<Map search*/}
								 {/*markers={this.state.markers}*/}
								 {/*center={{lat: 53.9, lng: 27.5 }}*/}
								 {/*onMarkersChanged={(markers) => this.setState({ markers })}*/}
								 {/*className="mt-2"/>*/}
						{/*</Grid>*/}

						{/*<Grid item xs={8}>*/}
							{/*<Typography type="headline" component="h1" className="mt-4">*/}
								{/*Время работы*/}
							{/*</Typography>*/}
						{/*</Grid>*/}

						{/*{*/}
							{/*this.state.workingTimes.map((item, index) => {*/}
								{/*return (*/}
									{/*<Grid item xs={8}>*/}
										{/*<Grid container>*/}
											{/*<Grid item xs={6}>*/}
												{/*<Title>{item.label}</Title>*/}
											{/*</Grid>*/}
											{/*<Grid item xs={3}>*/}
												{/*<FormControl className={classes.formControl}>*/}
													{/*<InputLabel htmlFor="from">From</InputLabel>*/}
													{/*<Select*/}
														{/*value={item.from}*/}
														{/*onChange={(event) => this.handleWorkingTimeChange(event, item, 'from')}*/}
														{/*input={<Input id="from" />}>*/}
														{/*<MenuItem value="">*/}
															{/*<em>None</em>*/}
														{/*</MenuItem>*/}
														{/*{*/}
															{/*[...new Array(24)].map((x, i) => (*/}
																{/*<MenuItem value={i + 1}>{i + 1}</MenuItem>*/}
															{/*))*/}
														{/*}*/}
													{/*</Select>*/}
												{/*</FormControl>*/}
											{/*</Grid>*/}
											{/*<Grid item xs={3}>*/}
												{/*<FormControl className={classes.formControl}>*/}
													{/*<InputLabel htmlFor="to">To</InputLabel>*/}
													{/*<Select*/}
														{/*value={item.to}*/}
														{/*onChange={(event) => this.handleWorkingTimeChange(event, item, 'to')}*/}
														{/*input={<Input id="to" />}>*/}
														{/*<MenuItem value="">*/}
															{/*<em>None</em>*/}
														{/*</MenuItem>*/}
														{/*{*/}
															{/*[...new Array(24)].map((x, i) => (*/}
																{/*<MenuItem value={i + 1}>{i + 1}</MenuItem>*/}
															{/*))*/}
														{/*}*/}
													{/*</Select>*/}
												{/*</FormControl>*/}
											{/*</Grid>*/}
										{/*</Grid>*/}
									{/*</Grid>*/}
								{/*)*/}
							{/*})*/}
						{/*}*/}

						{/*<Grid container justify="center" className="my-3">*/}
							{/*<Grid item xs={4} className="text-center">*/}
								{/*<Button type="submit" className="my-4 text-white w-100" accent="blue">*/}
									{/*{t('Сохранить')}*/}
								{/*</Button>*/}
							{/*</Grid>*/}
							{/*<Grid item xs={4} className="text-center">*/}
								{/*<Button className="my-4 text-white w-100" accent="red">*/}
									{/*{t('Отмена')}*/}
								{/*</Button>*/}
							{/*</Grid>*/}
						{/*</Grid>*/}



					</Card>
				</Grid>
			</Grid>
		);
	}
}