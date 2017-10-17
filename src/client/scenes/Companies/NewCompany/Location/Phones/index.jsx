import React from 'react';
import { Add } from 'material-ui-icons';
import { translate } from 'react-i18next';
import { Dropdown, Button, Title, Input,
Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";

import { Field, FieldArray } from 'redux-form'


@translate(['common'])
export default class Phones extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t, classes, fields, common, ...other} = this.props;
        return (
            <Grid item xs={8} className="my-2">
                <Grid container>
                    <Grid item className="d-flex align-items-center">
                        <Title className="mr-3">Телефоны</Title>
                        <Button fab onClick={() => fields.push({})}
                                color="primary" aria-label="add">
                            <Add />
                        </Button>
                    </Grid>
                </Grid>
                {
                    fields.map((member, index, fields) => (
                        <Grid container className="my-1">
                            <Grid item xs={12}>
                                <Field
                                    component={Input}
                                    fullWidth
                                    name={`${member}.phone`}
                                    placeholder="Телефон"/>
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
        );
    }
}