import React from 'react';
import { Add } from 'material-ui-icons';
import { translate } from 'react-i18next';
import { Dropdown, Button, Title, Input,
Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import styles from './styles';
import { Delete } from 'material-ui-icons';
import { withStyles } from 'material-ui/styles';

import { Field, FieldArray } from 'redux-form'


@translate(['common'])
@withStyles(styles)
export default class Phones extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {classes, fields} = this.props;
        return (
            <Grid item xs={12} className="my-2">
                <Grid container>
                    <Grid item className="d-flex align-items-center">
                        <Title className="mr-3">Телефоны</Title>
                        <Button variant="fab" onClick={() => fields.push({})}
                                className={classes.addButton}
                                color="primary" aria-label="add">
                            <Add />
                        </Button>
                    </Grid>
                </Grid>
                {
                    fields.map((member, index, fields) => (
                        <Grid container className="my-1">
                            <Grid item xs={4}>
                                <Field
                                    component={Input}
                                    fullWidth
                                    name={`${member}.phone`}
                                    placeholder="Телефон"/>
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="fab" className={classes.editButton}
                                        onClick={() => fields.remove(index)}>
                                    <Delete className={classes.editIcon} />
                                </Button>
                            </Grid>
                        </Grid>
                    ))
                }
            </Grid>
        );
    }
}