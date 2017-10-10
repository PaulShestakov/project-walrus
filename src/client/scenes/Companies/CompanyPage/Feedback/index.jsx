import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import FontAwesome from 'react-fontawesome';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Rating } from "components";
import styles from './styles';

import {Divider, Typography, Paper, Avatar} from "material-ui";
import { Link } from 'react-router-dom';
import moment from 'moment';


@translate(['common'])
@withStyles(styles)
export default class Feedbacks extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { feedbacks, classes } = this.props;
        return (
            <div>
            {
                feedbacks && feedbacks.map((feedback) => {
                    const imgSrc = feedback.photo ? feedback.photo : 'https://wikipet.by/templates/pet/dleimages/noavatar.png';
                    return (
                        <Grid key={feedback.id} container className="my-4 py-2 px-5">
                            <Grid item xs={12}>
                                <Grid container className="d-flex">
                                    <Grid item xs={1}>
                                        <img alt={feedback.name} src={imgSrc} className={classes.cardImage}/>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="d-flex-column">
                                            <Typography type="title" className="ml-3 text-wrap" component="p" >
                                                {feedback.user.name}
                                            </Typography>
                                            <Rating 
                                                readOnly
                                                value={feedback.rating}/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} className="ml-auto text-right">
                                        {moment(feedback.modificateDate).format('LLL')}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography type="title" className="text-wrap" component="p">
                                    {feedback.summary}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography type="body1" className="text-wrap" component="p">
                                    {feedback.feedback}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className="mt-4 mb-2 ">
                                <Divider  />
                            </Grid>
                        </Grid>
                    )
                })
            }
            </div>
        );
    }
}