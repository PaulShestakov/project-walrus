import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import FontAwesome from 'react-fontawesome';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import styles from './styles';
import classNames from 'classnames';

import { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {Divider, Typography, Paper} from "material-ui";


@translate(['common'])
@withStyles(styles)
export default class CompanyInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t, classes, company, ...other} = this.props;

        return (
            <Grid container >
                <Grid item xs={12} className="mt-4 mb-2 text-wrap">
                    <Typography type="body1" component="p">
                        {company.description}
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}