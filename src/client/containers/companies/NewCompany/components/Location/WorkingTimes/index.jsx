import React from 'react';
import { translate } from 'react-i18next';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import {InputLabel, FormControl} from "material-ui";
import { withStyles } from 'material-ui/styles';
import styles from './styles';

import { Field } from 'redux-form';


@translate(['common'])
@withStyles(styles)
export default class WorkingTimes extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t, classes, fields, ...other} = this.props;
        return (
            <Grid item xs={12} className={classes.input}>
            {
                fields.map((member, index, fields) => {
                    const curField = fields.get(index);
                    return (
                        <Grid container key={index}>
                            <Grid item xs={5} className="align-items-center d-flex">
                                <Title>{curField.dayOfWeek.label}</Title>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl>
                                    <Title>С</Title>
                                    <Field
                                        component={Input}
                                        name={`${member}.open`}
                                        placeholder="##:##"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl>
                                    <Title>По</Title>
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
            </Grid>
        );
    }
}