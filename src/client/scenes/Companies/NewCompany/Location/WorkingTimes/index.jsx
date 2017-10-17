import React from 'react';
import { translate } from 'react-i18next';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import {InputLabel, FormControl} from "material-ui";

import { Field } from 'redux-form'


@translate(['common'])
export default class WorkingTimes extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        const { fields, daysOfWeek } = nextProps;
        if (daysOfWeek && fields.length === 0) {
            daysOfWeek.forEach(day => {
                fields.push({day});
            });
        }
    }

    render() {
        const {t, classes, fields, common, ...other} = this.props;
        return (
            <div>
                {
                    fields.map((member, index, fields) => {
                        const curField = fields.get(index);
                        return (
                            <Grid container key={index}>
                                <Grid item xs={6}>
                                    <Title>{curField.day.label}</Title>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl>
                                        <InputLabel htmlFor="from">From</InputLabel>
                                        <Field
                                            component={Input}
                                            name={`${member}.from`}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl>
                                        <InputLabel htmlFor="to">To</InputLabel>
                                        <Field
                                            component={Input}
                                            name={`${member}.to`}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        );
                    })
                }
            </div>
        );
    }
}