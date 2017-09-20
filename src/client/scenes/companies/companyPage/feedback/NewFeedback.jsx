import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import FontAwesome from 'react-fontawesome';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import styles from './styles';

import { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {Divider, Typography, Paper} from "material-ui";
import { Link } from 'react-router-dom';


@translate(['common'])
@withStyles(styles)
export default class NewFeedback extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t, classes, company, ...other} = this.props;

        return (
            <Grid container className="m">
                <Grid item >
                    <Typography component="p">
                        New feedback
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}