import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Label, Input,
    Grid, ImageUploader, TextField, Tabs, Tab, Card, Rating, ConfirmDialog } from "components";
import styles from './styles';

import {Divider, Typography, Paper, Avatar} from "material-ui";
import moment from 'moment';
import {Delete} from "material-ui-icons";
import Authorized from "../../../../Authorized";


@translate(['common'])
@withStyles(styles)
export default class Feedbacks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isConfirmDialogOpened: false,
            feedback: {}
        };
    }

    deleteFeedback = () => {
        this.setState({ isConfirmDialogOpened: false });
        this.props.deleteFeedback(this.state.feedback.feedbackId);
    };

    render() {
        const { feedbacks, classes } = this.props;
        return (
            <div>
            {
                feedbacks && feedbacks.map((feedback) => {
                    const imgSrc = feedback.photo || 'https://wikipet.by/templates/pet/dleimages/noavatar.png';
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
                                        <div>
                                            {moment(feedback.modificateDate).lang('ru').format('LLL')}
                                        </div>
                                        <div className="mt-4">
                                            <Authorized allowedRoles={[1]}>
                                                <Button fab
                                                        onClick={() => this.setState({ isConfirmDialogOpened: true, feedback })}>
                                                    <Delete />
                                                </Button>
                                            </Authorized>
                                        </div>
                                    </Grid>
                                </Grid>
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
            {
                (feedbacks && feedbacks.length) === 0 &&
                <Grid container>
                    <Grid item xs={12} className={classes.emptyFeedbacks}>
                        У данного местоположения компании пока что нет отзывов
                    </Grid>
                </Grid>
            }
            <ConfirmDialog
                open={this.state.isConfirmDialogOpened}
                message={`Вы действительно хотите удалить отзыв ${this.state.feedback.feedback}`}
                title="Удаление комментария"
                okCallback={this.deleteFeedback}
                closeCallback={() => this.setState({ isConfirmDialogOpened: false })}/>
            </div>
        );
    }
}