import React from 'react';
import _ from 'lodash';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import styles from './styles';
import {Divider, Typography, Paper} from "material-ui";

import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';


@translate(['common'])
@withStyles(styles)
export default class NewCompany extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: {},
            imageObjects: [],
            subcategories: [],
            selectedCategory: {},
            selectedSubcategory: {},
            selectedSubway: {},
            selectedCity: {},
            markers: [],
            workingTimes: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            categories: nextProps.common.companiesCategories,
            subcategories: [],
            workingTimes:
                nextProps.common.daysOfWeek.map(item => {
                    return {
                        ...item,
                        from: null,
                        to: null
                    }
                })
        });
    }

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

    handleWorkingTimeChange = (event, item, type) => {
        item[type] = event.target.value;
        const index = this.state.workingTimes.findIndex(time => {
            return time.value === item.value;
        });
        if (index > -1) {
            this.state.workingTimes[index] = item;
            this.setState({ workingTimes: this.state.workingTimes });
        }
    };

    saveAction = (e) => {
        e.preventDefault();
        const formElements = e.target.elements;

        let phones = _.get(formElements.phones, 'value', null);
        if (phones) {
            phones = phones.split(',').map(i => i.trim()).filter(i => i.length > 0);
        }
        let times = this.state.workingTimes.filter(item => {
            return item.from && item.to;
        }).map(item => {
            return {
                day: item.value,
                from: item.from,
                to: item.to
            }
        });

        let formData = {
            name: _.get(formElements.name, 'value', null),
            logo: _.get(formElements.logo, 'value', null),
            description: _.get(formElements.description, 'value', null),
            url: _.get(formElements.url, 'value', null),
            email: _.get(formElements.email, 'value', null),
            phones: phones,

            companyCategoryId: this.state.selectedCategory.value,
            companySubcategoryId: this.state.selectedSubcategory.value,

            city: this.state.selectedCity.value,
            subway: this.state.selectedSubway.value,
            address: _.get(formElements.address, 'value', null),
            workingTimes: times
        };

        if (this.state.markers.length > 0) {
            formData = {
                ...formData,
                ...this.state.markers[0].position.toJSON()
            };
        }

        if (this.state.imageObjects.length > 0) {
            formData = {
                ...formData,
                image: this.state.imageObjects[0].file,
            };
        }

        this.props.postCompany(formData, this.props.history);
    };

    render() {
        const {t, classes, common, ...other} = this.props;

        return (
            <form onSubmit={this.saveAction} className="d-flex-column align-items-center my-4">
                <Card raised>
                    <Grid container justify="center">

                        <Grid item xs={8}>
                            <Typography type="headline" component="h1" className="mt-4">
                                    Основная информация
                            </Typography>
                        </Grid>

                        <Grid item xs={8}>
                            <Title>Название</Title>
                            <Input name="name" placeholder="Название компании" fullWidth className="mt-2"/>
                        </Grid>
                        <Grid item xs={8}>
                            <Title>Категория</Title>
                            <Dropdown name="companyCategoryId"
                                      value={this.state.selectedCategory.label}
                                      onChange={this.handleCategoryChange}
                                      options={this.state.categories}
                                      className="mt-2"/>
                        </Grid>
                        <Grid item xs={8}>
                            <Title>Подкатегория</Title>
                            <Dropdown name="companySubcategoryId"
                                      onChange={(option) => this.setState({  selectedSubcategory : option })}
                                      value={this.state.selectedSubcategory.label}
                                      options={this.state.subcategories}
                                      className="mt-2"/>
                        </Grid>

                        <Grid item xs={8}>
                            <Title>Ссылка на лого</Title>
                            <Input name="logo" placeholder="Лого" fullWidth className="mt-2"/>
                        </Grid>

                        <Grid item xs={8}>
                            <Title>Картинка лого</Title>
                            <ImageUploader className="mt-4"
                                imageObjects={this.state.imageObjects}
                                onImageAdd={(object) => this.setState({ imageObjects: [object] })}
                                onImageDelete={() => this.setState({ imageObjects: [] })}/>
                        </Grid>
                        
                        <Grid item xs={8}>
                            <Title>Описание</Title>
                            <TextField name="description"
                                       multiline
                                       rowsMax="10"
                                       placeholder="Описание"
                                       fullWidth
                                       className="mt-2"/>
                        </Grid>
                        <Grid item xs={8}>
                            <Title>Сайт компании</Title>
                            <Input name="url" placeholder="Сайт" fullWidth className="mt-2"/>
                        </Grid>
                        <Grid item xs={8}>
                            <Title>Email</Title>
                            <Input name="email" placeholder="Email" fullWidth className="mt-2"/>
                        </Grid>
                        <Grid item xs={8}>
                            <Title>Телефоны</Title>
                            <Input name="phones" placeholder="Телефоны" fullWidth className="mt-2"/>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography type="headline" component="h1" className="mt-4">
                                    Местоположение
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={8}>
                            <Title>Город</Title>
                            <Dropdown name="city"
                                      onChange={(option) => this.setState({  selectedCity: option })}
                                      value={this.state.selectedCity.label}
                                      options={this.props.common.cities}
                                      className="mt-2"/>
                        </Grid>

                        <Grid item xs={8}>
                            <Title>Метро</Title>
                            <Dropdown name="subway"
                                      onChange={(option) => this.setState({  selectedSubway: option })}
                                      value={this.state.selectedSubway.label}
                                      options={this.props.common.subway}
                                      className="mt-2"/>
                        </Grid>

                        <Grid item xs={8}>
                            <Title>Адрес</Title>
                            <Input name="address" placeholder="Адрес" fullWidth className="mt-2" onChange={(event) => this.setState({ address: event.target.value })}/>
                        </Grid>

                        <Grid item xs={8}>
                            <Title>Карта</Title>
                            <Map search
                                 markers={this.state.markers}
                                 center={{lat: 53.9, lng: 27.5 }}
                                 onMarkersChanged={(markers) => this.setState({ markers })}
                                 className="mt-2"/>
                        </Grid>

                        <Grid item xs={8}>
                            <Typography type="headline" component="h1" className="mt-4">
                                Время работы
                            </Typography>
                        </Grid>

                        {
                            this.state.workingTimes.map((item, index) => {
                                return (
                                    <Grid item xs={8}>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Title>{item.label}</Title>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="from">From</InputLabel>
                                                    <Select
                                                        value={item.from}
                                                        onChange={(event) => this.handleWorkingTimeChange(event, item, 'from')}
                                                        input={<Input id="from" />}>
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {
                                                            [...new Array(24)].map((x, i) => (
                                                                <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel htmlFor="to">To</InputLabel>
                                                    <Select
                                                        value={item.to}
                                                        onChange={(event) => this.handleWorkingTimeChange(event, item, 'to')}
                                                        input={<Input id="to" />}>
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {
                                                            [...new Array(24)].map((x, i) => (
                                                                <MenuItem value={i + 1}>{i + 1}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }

                        <Grid container justify="center" className="my-3">
                            <Grid item xs={4} className="text-center">
                                <Button type="submit" className="my-4 text-white w-100" accent="blue">
                                    {t('Сохранить')}
                                </Button>
                            </Grid>
                            <Grid item xs={4} className="text-center">
                                <Button className="my-4 text-white w-100" accent="red">
                                    {t('Отмена')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </form>
        );
    }
}