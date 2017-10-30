import React from 'react';
import { Add } from 'material-ui-icons';
import { translate } from 'react-i18next';
import { Dropdown, Button, Title, Input,
    Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";

import { Field, FieldArray } from 'redux-form'
import {Typography} from "material-ui";
import SwipeableViews from 'react-swipeable-views';


@translate(['common'])
export default class Animals extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedAnimal: 0,
            result: [],
            animals: [],
            breeds: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            animals: nextProps.animals
        });
    }

    handleTabPress = (event, index) => {
        this.setState({ selectedAnimal: index });
    };

    handleOnAddAddressPress = () => {
        const { fields } = this.props;
        const { result } = this.state;
        result.push({
            label: `Животное ${fields.length + 1}`,
            breeds: []
        });
        fields.push({});
        this.setState({ selectedAnimal: fields.length, result });
    };

    handleAnimalChange = (animal, index) => {
        const foundAnimal = this.state.animals.find(i => i.value === animal.value);
        if (foundAnimal) {
            const { result } = this.state;
            result[index].breeds = foundAnimal.breeds;
            this.setState({ breeds: foundAnimal.breeds, result });
        }
    };

    render() {
        const { renderAnimals, renderBreeds, fields } = this.props;
        const { result, selectedAnimal } = this.state;
        return (
            <div>
                {
                    renderAnimals &&
                    <div>
                        <Grid item xs={8}>
                            <Grid item className="d-flex align-items-center">
                                <Typography type="headline" component="h1" className="mt-4 mr-4">
                                    Связь с животными
                                </Typography>
                                <Button fab onClick={this.handleOnAddAddressPress}
                                        color="primary" aria-label="add">
                                    <Add />
                                </Button>
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
                                            label={result[index].label}
                                            value={index}/>
                                    );
                                })
                            }
                        </Tabs>
                        <SwipeableViews
                            index={selectedAnimal}
                            style={{ overflow: 'visible' }}
                            containerStyle={{ overflow: 'visible' }}
                            slideStyle={{ overflow: 'visible' }}
                            onChangeIndex={this.handleTabPress}>
                            {
                                fields.map((member, index) => {
                                    return (
                                        <Grid key={index}
                                              container
                                              spacing={16}
                                              className="p-2">
                                        <Grid item xs={12}>
                                            <Title>Животное</Title>
                                            <Field name={`${member}.animalId`}
                                                   component={Dropdown}
                                                   options={this.state.animals}
                                                   onChange={(animal) => this.handleAnimalChange(animal, index)}
                                                   format={value => this.state.animals.find(x => x.value === value)}
                                                   normalize={value => value.value}
                                            />
                                        </Grid>
                                        {
                                            renderBreeds &&
                                            <Grid item xs={12}>
                                                <Title>Порода / Вид</Title>
                                                <Field name={`${member}.breedId`}
                                                       component={Dropdown}
                                                       options={result[selectedAnimal].breeds}
                                                       format={value => result[selectedAnimal].breeds.find(x => x.value === value)}
                                                       normalize={value => value.value}
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