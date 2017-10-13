import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import styles from './styles';
import {Divider, Typography, Paper} from "material-ui";
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { CircularProgress } from 'material-ui/Progress';



@translate(['common'])
@withStyles(styles)
export default class EditCompany extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			companyDataLoaded: false,

			name: '',
			subcategories: [],

			imageObjects: []
		}
	}

	componentDidMount() {
		const companyId = this.props.match.params.companyId;
		if (companyId) {
			this.props.loadCompany(companyId);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.editCompany.company) {
			this.setState({
				companyDataLoaded: true,
				...nextProps.editCompany.company
			});
		}
	}

	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleCategoriesDropdownChange = (event) => {
		const category = this.props.common.companiesCategories.find(category => category.value === event.target.value);
		this.setState({
			categoryId: event.target.value,
			subcategories: category.subcategories
		});
	};

	handleSubcategoriesDropdownChange = (option) => {
		const subcategory = this.state.subcategories.find(subcategory => subcategory.value === option.value);
		this.setState({
			subcategoryId: subcategory.value,
			subcategoryName: subcategory.label,
		});
	};

	handleAddImage = (object) => {
		this.setState({
			imageObjects: [this.state.imageObjects]
		})
	};

	handleRemoveImage = (object) => {

	};

	handleCitiesDropdownChange = (option) => {
		const city = this.state.commom.cities.find(city => city.value === option.value);
		this.setState({
			cityId: city.value,
			cityName: city.label,
		});
	};

	handleSubwayDropdownChange = (option) => {
		const subway = this.state.commom.subway.find(subway => subway.value === option.value);
		this.setState({
			subwayId: subway.value,
			subwayName: subway.label,
		});
	};

	render() {
		const {t, classes, common, ...other} = this.props;

		return (
			<Grid container justify="center" spacing={0} className="my-4">
				<Grid item xs={9}>
					<Card className="p-5">
						{
							!this.state.companyDataLoaded ? (
								<Grid container justify="center">
									<Grid item>
										<CircularProgress className={classes.progress} />
									</Grid>
								</Grid>
							) : (
								<Grid container direction="column" spacing={24}>
									{JSON.stringify(this.props.editCompany.company)}
									<Grid item>
										<Typography type="headline" component="h1" className="mt-4">
											Основная информация
										</Typography>
									</Grid>

									<Grid item>
										<Title>Название</Title>
										<Input name="companyName"
											   value={this.state.name}
											   onChange={this.handleInputChange}
											   fullWidth
											   placeholder="Название компании"
											   className="mt-2"/>
									</Grid>
									<Grid item className={classes.flexColumn}>
										<Title>Категория</Title>
										<Select
											value={this.state.categoryId}
											onChange={this.handleCategoriesDropdownChange}
											input={<Input id="age-simple" />}
										>
											{
												this.props.common.companiesCategories.map(category => (
													<MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
												))
											}
										</Select>
									</Grid>

									<Grid item>
										<Title>Подкатегория</Title>
										<Dropdown value={this.state.subcategoryName}
											  onChange={this.handleSubcategoriesDropdownChange}
											  options={this.state.subcategories}
											  className="mt-2"/>
									</Grid>

									<Grid item>
										<Title>Ссылка на лого</Title>
										<Input name="logo"
											   onChange={this.handleInputChange}
											   value={this.state.logo}
											   placeholder="Лого" fullWidth className="mt-2"/>
									</Grid>

									<Grid item>
										<Title>Картинка лого</Title>
										<ImageUploader className="mt-4"
											   imageObjects={this.state.imageObjects}
											   onImageAdd={this.handleAddImage}
											   onImageDelete={this.handleRemoveImage}/>
									</Grid>

									{/*<Grid item>*/}
										{/*<Title>Описание</Title>*/}
										{/*<TextField*/}
											{/*name="description"*/}
											{/*value={this.state.description}*/}
											{/*onChange={this.handleInputChange}*/}
											{/*multiline*/}
											{/*rowsMax="10"*/}
											{/*placeholder="Описание"*/}
											{/*fullWidth*/}
											{/*className="mt-2"/>*/}
									{/*</Grid>*/}

									{/*<Grid item>*/}
										{/*<Title>Сайт компании</Title>*/}
										{/*<Input name="websiteUrl"*/}
											   {/*value={this.state.websiteUrl}*/}
											   {/*onChange={this.handleInputChange}*/}
											   {/*placeholder="Сайт"*/}
											   {/*fullWidth className="mt-2"/>*/}
									{/*</Grid>*/}


									{/*<Grid item>*/}
										{/*<Title>Email</Title>*/}
										{/*<Input*/}
											{/*name="email"*/}
											{/*value={this.state.email}*/}
											{/*onChange={this.handleInputChange}*/}
											{/*placeholder="Email"*/}
											{/*fullWidth className="mt-2"/>*/}
									{/*</Grid>*/}


									{/*<Grid item>*/}
										{/*<Title>Телефоны</Title>*/}
										{/*<Input name="phones" placeholder="Телефоны" fullWidth className="mt-2"/>*/}
									{/*</Grid>*/}


									{/*<Grid item>*/}
										{/*<Typography type="headline" component="h1" className="mt-4">*/}
											{/*Местоположение*/}
										{/*</Typography>*/}
									{/*</Grid>*/}

									{/*<Grid item>*/}
										{/*<Title>Город</Title>*/}
										{/*<Dropdown name="city"*/}
											  {/*onChange={this.handleCitiesDropdownChange}*/}
											  {/*value={this.state.cityName}*/}
											  {/*options={this.props.common.cities}*/}
											  {/*className="mt-2"/>*/}
									{/*</Grid>*/}

									{/*<Grid item>*/}
										{/*<Title>Метро</Title>*/}
										{/*<Dropdown name="subway"*/}
											  {/*onChange={this.handleSubwayDropdownChange}*/}
											  {/*value={this.state.subwayName}*/}
											  {/*options={this.props.common.subway}*/}
											  {/*className="mt-2"/>*/}
									{/*</Grid>*/}

									{/*<Grid item>*/}
										{/*<Title>Адрес</Title>*/}
										{/*<Input name="address" placeholder="Адрес" fullWidth className="mt-2"*/}
											   {/*onChange={this.handleInputChange}/>*/}
									{/*</Grid>*/}
								</Grid>
							)
						}

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