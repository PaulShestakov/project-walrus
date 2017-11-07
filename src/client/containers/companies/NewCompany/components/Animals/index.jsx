import React from 'react';
import { Add } from 'material-ui-icons';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input,
    Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";

import styles from './styles';

import { Field, FieldArray } from 'redux-form'
import {Typography} from "material-ui";
import { Delete } from 'material-ui-icons';
import SwipeableViews from 'react-swipeable-views';

@translate(['common'])
@withStyles(styles)
export default class Animals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAnimal: 0,
        }
    }

    handleTabPress = (event, index) => {
        this.setState({ selectedAnimal: index });
    };

    handleOnAddAddressPress = () => {
        const { fields } = this.props;
        fields.push({
            label: `Животное ${fields.length + 1}`,
            animals: this.props.animals,
            breeds: [],
        });
        this.setState({ selectedAnimal: fields.length });
    };

    handleAnimalChange = (animal, index) => {
        const foundAnimal = this.props.animals.find(i => i.value === animal.value);
        if (foundAnimal) {
            const { fields } = this.props;
            fields.get(index).breeds = foundAnimal.breeds;
        }
    };

    render() {
        const { classes, renderAnimals, renderBreeds, fields } = this.props;
        const { selectedAnimal } = this.state;
        return (
            <div>
                {
                    renderAnimals &&
                    <div>
                        <Grid item xs={8}>
                            <Grid item className="d-flex align-items-center">
                                <Grid container align="center">
                                    <Grid item>
                                        <Typography type="headline" component="h1" className="mr-4">
                                            Специализация
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button fab onClick={this.handleOnAddAddressPress}
                                                className={classes.addButton}
                                                color="primary" aria-label="add">
                                            <Add />
                                        </Button>
                                    </Grid>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                        <Tabs
                            value={selectedAnimal}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            onChange={this.handleTabPress}
                        >
                            {
                                fields.map((field, index) => {
                                    return (
                                        <Tab
                                            key={index}
                                            label={`Животное ${index + 1}`}
                                            value={index}/>
                                    );
                                })
                            }
                        </Tabs>
                        <SwipeableViews
                            index={selectedAnimal}
                            style={{ minHeight: '450px' }}
                            containerStyle={{ minHeight: '450px' }}
                            slideStyle={{ overflow: 'visible' }}
                            onChangeIndex={this.handleTabPress}>
                            {
                                fields.map((member, index, fields) => {
                                    const curField = fields.get(index);
                                    return (
                                        <Grid key={index}
                                              container
                                              spacing={16}
                                              className="p-2">
                                        <Grid item xs={12} className="text-right">
                                            <Button fab className={classes.editButton}
                                                    onClick={() => fields.remove(index)}>
                                                <Delete className={classes.editIcon} />
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Title>Животное</Title>
                                            <Field name={`${member}.animalId`}
                                                   component={Dropdown}
                                                   options={curField.animals}
                                                   onChange={(animal) => this.handleAnimalChange(animal, index)}
                                            />
                                        </Grid>
                                        {
                                            renderBreeds &&
                                            <Grid item xs={12}>
                                                <Title>Порода / Вид</Title>
                                                <Field name={`${member}.breedId`}
                                                       component={Dropdown}
                                                       options={curField.breeds}
                                                />
                                            </Grid>
                                        }
                                        </Grid>
                                    )
                                })
                            }
                        </SwipeableViews>
                    </div>
                }
            </div>
        );
    }
}