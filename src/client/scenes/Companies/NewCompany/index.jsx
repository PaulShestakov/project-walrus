import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';

import { Dropdown, Button, Title, Input, Grid, ImageUploader,
        TextField, Tabs, Tab, Card, Map }
from "components";

import SwipeableViews from 'react-swipeable-views';

import styles from './styles';
import {Divider, Typography, Paper} from "material-ui";

import { Field, reduxForm } from 'redux-form'
import Location from "./Location/index";


@translate(['common'])
class NewCompany extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imageObjects: [],
            categories: [],
            subcategories: [],
            addresses: ["Адрес 1", "Адрес 2"],
            selectedAddress: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            categories: nextProps.common.companiesCategories
        });
    }

    handleTabPress = (event, index) => {
        this.setState({ selectedAddress: index });
    };

    handleCategoryChange = (selected) => {
        const category = this.state.categories.find((category) => {
            return category.value === selected.value;
        });
        this.props.change('companySubcategoryId', null);
        this.setState({
            subcategories: category.subcategories
        });
    };

    // handleWorkingTimeChange = (event, item, type) => {
    //     item[type] = event.target.value;
    //     const index = this.state.workingTimes.findIndex(time => {
    //         return time.value === item.value;
    //     });
    //     if (index > -1) {
    //         this.state.workingTimes[index] = item;
    //         this.setState({ workingTimes: this.state.workingTimes });
    //     }
    // };

    saveAction = (values) => {
        const { imageObjects } = this.state;
        values.image = imageObjects && imageObjects.length > 0 ? this.state.imageObjects[0].file : null;
        this.props.postCompany(values, this.props.history);
    };

    render() {
        const { t, classes, common : {companiesCategories}, handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.saveAction)}
                  className="d-flex-column align-items-center my-4">
                <Card raised>
                    <Grid container justify="center">

                        <Grid item xs={8}>
                            <Typography type="headline" component="h1" className="mt-4">
                                Основная информация
                            </Typography>
                        </Grid>

                        <Grid item xs={8}>
                            <Title>Название</Title>
                            <Field name="name"
                                   component={Input}
                                   fullWidth
                                   placeholder="Название компании"/>
                        </Grid>
                        <Grid item xs={8}>
                            <Title>Категория</Title>
                            <Field name="companyCategoryId"
                                   component={Dropdown}
                                   options={this.state.categories}
                                   onChange={this.handleCategoryChange}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Title>Подкатегория</Title>
                            <Field name="companySubcategoryId"
                                   component={Dropdown}
                                   options={this.state.subcategories}
                            />
                        </Grid>

                        <Grid item xs={8}>
                            <Title>Картинка лого</Title>
                            <Field name="image"
                                   type="file"
                                   component={ImageUploader}
                                   imageObjects={this.state.imageObjects}
                                   onImageAdd={(object) => this.setState({ imageObjects: [object] })}
                                   onImageDelete={() => this.setState({ imageObjects: [] })}/>
                        </Grid>
                        
                        <Grid item xs={8}>
                            <Title>Описание</Title>
                            <Field name="description"
                                   component={Input}
                                   multiline
                                   rowsMax="20"
                                   placeholder="Описание"
                                   fullWidth/>
                        </Grid>
                        <Grid item xs={8}>
                            <Title>Сайт компании</Title>
                            <Field name="url"
                                   component={Input}
                                   placeholder="Сайт"
                                   fullWidth/>
                        </Grid>
                        <Grid item xs={8}>
                            <Title>Email</Title>
                            <Field name="email"
                                   component={Input}
                                   placeholder="Email"
                                   fullWidth/>
                        </Grid>
                        <Grid item xs={8}>
                            <Title>Телефоны</Title>
                            <Field name="phones"
                                   component={Input}
                                   placeholder="Телефоны"
                                   fullWidth/>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography type="headline" component="h1" className="mt-4">
                                    Местоположение
                            </Typography>
                        </Grid>

                        <Grid item xs={8}>
                            <Tabs
                                indicatorColor="primary"
                                textColor="primary"
                                value={this.state.selectedAddress}
                                onChange={this.handleTabPress}
                                fullWidth>
                                {
                                    this.state.addresses.map((address, index) => (
                                        <Tab
                                            className={classes.tab}
                                            key={address}
                                            label={address}
                                            value={index}/>
                                    ))
                                }
                            </Tabs>
                            <SwipeableViews index={this.state.selectedAddress} onChangeIndex={this.handleTabPress}>
                                {
                                    this.state.addresses.map((address, index) => {
                                        return (
                                            <Location key={address} number={index}/>
                                        );
                                    })
                                }
                            </SwipeableViews>
                        </Grid>

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

export default withStyles(styles)(reduxForm({
    form: 'company',
})(NewCompany));