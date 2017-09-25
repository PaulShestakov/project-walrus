import React from 'react';
import _ from 'lodash';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import styles from './styles';
import {Divider, Typography, Paper} from "material-ui";


@translate(['common'])
@withStyles(styles)
export default class NewCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phones: [],
            selectedCategory: null,
            selectedSubcategory: null
        };
    }

    componentWillMount() {
        if (this.props.common.companiesCategories.length === 0) {
            this.props.loadCompanyCategories();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            categories: nextProps.common.companiesCategories.map(category => {
                return {
                    value: category.companyCategoryId,
                    label: category.companyCategoryName
                }
            }),
            subcatories: []
        });
    }

    handleCategoryChange = (option) => {
        const category = this.props.common.companiesCategories.find((cat) => {
            return cat.companyCategoryId === option.value;
        });
        const subcats = category.subcategories.map(subcategory => {
            return {
                value: subcategory.companySubcategoryId,
                label: subcategory.companySubcategoryName
            }
        });
        this.setState({
            selectedCategory: option,
            subcategories: subcats,
            selectedSubcategory: subcats[0]
        });
    };

    saveAction = (e) => {
        e.preventDefault();
        const formElements = e.target.elements;

        const formData = {
            name: _.get(formElements.name, 'value', null),
            logo: _.get(formElements.logo, 'value', null),
            description: _.get(formElements.description, 'value', null),
            url: _.get(formElements.url, 'value', null),
            email: _.get(formElements.email, 'value', null),

            companyCategoryId: this.state.selectedCategory.value,
            companySubcategoryId: this.state.selectedSubcategory.value,
        };

        this.props.postCompany(formData, this.props.history);
    };

    render() {
        const {t, classes, ...other} = this.props;

        return (
            <form onSubmit={this.saveAction} className="d-flex-column align-items-center my-4">
                <Card raised>
                    <Grid container justify="center">
                        <Grid item md={8} className="text-center">
                            <Typography type="headline" component="h1">
                                Новая компания
                            </Typography>
                        </Grid>
                        <Grid item md={8}>
                            <Title>Название</Title>
                            <Input name="name" placeholder="Название компании" fullWidth className="mt-2"/>
                        </Grid>
                        <Grid item md={8}>
                            <Title>Категория</Title>
                            <Dropdown name="companyCategoryId"
                                      value={this.state.selectedCategory}
                                      onChange={this.handleCategoryChange}
                                      options={this.state.categories}
                                      className="mt-2"/>
                        </Grid>
                        <Grid item md={8}>
                            <Title>Подкатегория</Title>
                            <Dropdown name="companySubcategoryId"
                                      value={this.state.selectedSubcategory}
                                      options={this.state.subcategories}
                                      className="mt-2"/>
                        </Grid>
                        <Grid item md={8}>
                            <Title>Ссылка на лого</Title>
                            <Input name="logo" placeholder="Лого" fullWidth className="mt-2"/>
                        </Grid>
                        <Grid item md={8}>
                            <Title>Описание</Title>
                            <TextField name="description"
                                       multiline
                                       rowsMax="10"
                                       placeholder="Описание"
                                       fullWidth
                                       className="mt-2"/>
                        </Grid>
                        <Grid item md={8}>
                            <Title>Сайт компании</Title>
                            <Input name="url" placeholder="Сайт" fullWidth className="mt-2"/>
                        </Grid>
                        <Grid item md={8}>
                            <Title>Email</Title>
                            <Input name="email" placeholder="Email" fullWidth className="mt-2"/>
                        </Grid>
                        {/*<Grid item md={8}>
                            <Title>Телефоны</Title>
                            <Input name="phones" placeholder="Телефоны" fullWidth className="mt-2"/>
                        </Grid>*/}
                        <Grid container justify="center">
                            <Grid item md={4} className="text-center">
                                <Button type="submit" className="my-4 text-white w-100" accent="blue">
                                    {t('Сохранить')}
                                </Button>
                            </Grid>
                            <Grid item md={4} className="text-center">
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