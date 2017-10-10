import React from 'react';
import { translate } from 'react-i18next';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Rating } from "components";

@translate(['common'])
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
        const {t} = this.props;

        return (
            <form onSubmit={this.saveAction} className="my-5">
                <Grid container>
                    <Grid item xs={10} className="mx-auto">
                        <Grid container spacing={24}>
                            <Grid item className="w-100" >
                                <Title>Заголовок</Title>
                                <Input 
                                    name="summary" 
                                    onChange={(event) => this.setState({ summary: event.target.value })} 
                                    placeholder="Заголовок" 
                                    fullWidth
                                    className="mt-2"/>
                            </Grid>
                            <Grid item className="w-100" >
                                <Title>Оценка компании</Title>
                                <Rating value={this.state.rating} onChange={(i) => this.setState({ rating: i })}/>
                            </Grid>
                            <Grid item className="w-100" >
                                <Title>Отзыв</Title>
                                <Input name="feedback" 
                                        multiline
                                        rowsMax="10" 
                                        onChange={(event) => this.setState({ feedback: event.target.value })} 
                                        placeholder="Отзыв" 
                                        fullWidth 
                                        className="mt-2"/>
                            </Grid>
                            <Grid item className="w-100 text-center">
                                <Button type="submit" className="text-white" accent="red">
                                    {t('Отправить')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        );
    }
}