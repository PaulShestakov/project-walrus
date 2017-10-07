import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import FontAwesome from 'react-fontawesome';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Rating } from "components";
import styles from './styles';

import { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import {Divider, Typography, Paper} from "material-ui";
import { Link } from 'react-router-dom';


@translate(['common'])
@withStyles(styles)
export default class NewFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
            summary: '',
            rating: 0,
            user : { ... props.user },
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ user: { ... nextProps.user,  enteredName: nextProps.user.name } });
    }

    saveAction = (event) => {
        event.preventDefault();
        this.props.onPostFeedback({ ...this.state });
    };

    render() {
        const {t, classes, company, ...other} = this.props;

        return (
            <form onSubmit={this.saveAction} className="my-5">
                <Grid container xs={10} className="mx-auto">
                    <Grid item className="my-2" >
                        <Title>Ваше имя</Title>
                        <Input 
                            name="user"
                            value={ this.state.user.enteredName }
                            onChange={(event) => this.setState({ user: {...this.state.user, enteredName: event.target.value } })}
                            placeholder="Заголовок"
                            fullWidth
                            className="mt-2"/>
                    </Grid>
                    <Grid item className="w-100 my-2" >
                        <Title>Заголовок</Title>
                        <Input 
                            name="summary" 
                            onChange={(event) => this.setState({ summary: event.target.value })} 
                            placeholder="Заголовок" 
                            fullWidth
                            className="mt-2"/>
                    </Grid>
                    <Grid item className="w-100 my-2" >
                        <Title>Оценка компании</Title>
                        <Rating value={this.state.rating} onChange={(i) => this.setState({ rating: i })}/>
                    </Grid>
                    <Grid item className="w-100 my-2" >
                        <Title>Отзыв</Title>
                        <Input name="feedback" 
                                multiline
                                rowsMax="10" 
                                onChange={(event) => this.setState({ feedback: event.target.value })} 
                                placeholder="Отзыв" 
                                fullWidth 
                                className="mt-2"/>
                    </Grid>
                    <Grid item className="w-100 text-center my-4">
                        <Button type="submit" className="text-white" accent="red">
                            {t('Отправить')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}