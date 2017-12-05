import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import styles from './styles';
import { Link } from 'react-router-dom';
import { Paper, CardMedia, Typography } from 'material-ui';
import Util from "../../../../util/index";

@translate(['common'])
@withStyles(styles)
export default class Type extends React.Component {

    render() {
        const { classes, type, match } = this.props;
        const defaultImage = 'http://cdn4.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg';
        return (
            <Grid container spacing={0}>
                {
                    type.subcategories.map((subcategory, index) => {
                        return (
                            <Grid item xs={6} md={4} lg={3} className="p-3">
                                <Link key={index}
                                      className={classes.exactTypeLink}
                                      to={`${match.url}/${subcategory.value.toLowerCase()}/BY`}>
                                    <Paper>
                                        <CardMedia
                                            className={classes.cardImage}
                                            image={Util.encodeUrl(subcategory.imageUrl, defaultImage)}
                                        />
                                        <div className="d-flex justify-content-between p-2">
                                            <Typography component="h2">
                                                {subcategory.label}
                                            </Typography>
                                            <div className={classes.numberWrapper}>
                                                {subcategory.count}
                                            </div>
                                        </div>
                                    </Paper>
                                </Link>
                            </Grid>
                        );
                    })
                }
            </Grid>
        );
    }
}