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
export default class Extensions extends React.Component {

    constructor(props) {
        super(props);
    }

    handleValueChange = (outerIndex, index, newValue) => {
        const element = this.props.fields.get(outerIndex).childs[index];
        element.value = newValue;
    }

    addChild = (index, name) => {
        const field = this.props.fields.get(index);
        field.childs.push({
            values: this.props.codeValues[name]
        });
        this.props.change('extensions[' + index + ']', field);
    };

    deleteChild = (elementIndex, index) => {
        const parent = this.props.fields.get(elementIndex);
        parent.childs.splice(index, 1);
        this.props.change('extensions[' + elementIndex + ']', parent);
    };

    render() {
        const { classes, fields, codeValues } = this.props;
        return (
            <div>
                {
                    fields.map((member, outerIndex, fields) => {
                        const curField = fields.get(outerIndex);
                        return (
                            <Grid item xs={12} className="my-2">
                                <Grid container>
                                    <Grid item className="d-flex align-items-center">
                                        <Title className="mr-3">{ curField.title }</Title>
                                        <Button fab onClick={() => this.addChild(outerIndex, curField.name)}
                                                className={classes.addButton}
                                                color="primary" aria-label="add">
                                            <Add />
                                        </Button>
                                    </Grid>
                                </Grid>
                                <FieldArray
                                    name={`${member}.childs`}
                                    deleteChild={this.deleteChild}
                                    elementIndex={outerIndex}
                                    component={Inner}
                                />
                            </Grid>
                        );
                    })
                }
            </div>
        );
    }
}

@withStyles(styles)
class Inner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, deleteChild, elementIndex, fields } = this.props;
        return (
            <div>
                {
                    fields.map((member, index, fields) => {
                        const curField = fields.get(index);
                        return (
                            <Grid container className="my-1">
                                <Grid item xs={4}>
                                    <Field
                                        component={Dropdown}
                                        options={curField.values}
                                        fullWidth
                                        name={`${member}.item`}/>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button fab className={classes.editButton}
                                            onClick={() => deleteChild(elementIndex, index)}>
                                        <Delete className={classes.editIcon} />
                                    </Button>
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </div>
        )
    }
}