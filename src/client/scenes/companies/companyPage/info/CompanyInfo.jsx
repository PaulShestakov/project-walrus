import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import FontAwesome from 'react-fontawesome';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import styles from './styles';

import { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {Divider, Typography, Paper} from "material-ui";
import Map from "./Map";


@translate(['common'])
@withStyles(styles)
export default class CompanyInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {t, company, ...other} = this.props;

        return (
            <Grid container >
                <Grid item md={12} className="mt-4 mb-2">
                    <Typography type="body1" component="p">
                        {company.description}
                    </Typography>
                </Grid>
                <Grid item md={12}>
                    <Map
                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        location={{lat: company.lat, lng: company.lng}}/>
                </Grid>
            </Grid>
        );
    }
}