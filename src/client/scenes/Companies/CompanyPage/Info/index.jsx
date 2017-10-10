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
        const markers = [{
            position: {
                lat: company.lat,
                lng: company.lng
            }
        }];

        return (
            <Grid container >
                <Grid item md={12} className="mt-4 mb-2 text-wrap">
                    <Typography type="body1" component="p">
                        {company.description}
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Map markers={markers} center={markers[0].position}/>
                </Grid>
            </Grid>
        );
    }
}