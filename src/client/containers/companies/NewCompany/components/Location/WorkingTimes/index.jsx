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

    render() {
        const {t, classes, fields, ...other} = this.props;
        return (
            <div>
                {
                    fields.map((member, index, fields) => {
                        const curField = fields.get(index);
                        return (
                            <Grid container key={index}>
                                <Grid item xs={6}>
                                    <Title>{curField.dayOfWeek.label}</Title>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl>
                                        <InputLabel htmlFor="open">С</InputLabel>
                                        <Field
                                            component={Input}
                                            name={`${member}.open`}
                                            placeholder="##:##"
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl>
                                        <InputLabel htmlFor="close">По</InputLabel>
                                        <Field
                                            component={Input}
                                            name={`${member}.close`}
                                            placeholder="##:##"
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