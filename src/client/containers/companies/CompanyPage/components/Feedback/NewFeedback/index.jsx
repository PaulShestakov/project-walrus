import React from 'react';
import { translate } from 'react-i18next';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Rating } from "components";
import { Field, FieldArray, reduxForm } from 'redux-form'

@translate(['common'])
@reduxForm({form: 'feedback', enableReinitialize: true})
export default class NewFeedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 0,
        }
    }

    changeRating = (rating) => {
        this.setState({ rating });
    };

    handleSubmit = (values) => {
        values.rating = this.state.rating;
        this.props.onPostFeedback(values);
    };

    render() {
        const {t, handleSubmit} = this.props;

        return (
            <form className="my-5">
                <Grid container>
                    <Grid item xs={10} className="mx-auto">
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <div>
                                    <Title>Заголовок</Title>
                                </div>
                                <Field
                                    name="summary"
                                    component={Input}
                                    fullWidth
                                    className="mt-2"
                                    placeholder="Заголовок" 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Title>Оценка компании</Title>
                                <Rating value={this.state.rating}
                                onChange={this.changeRating}/>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <Title>Отзыв</Title>
                                </div>
                                <Field
                                    name="feedback"
                                    component={Input}
                                    multiline
                                    rowsMax="10"
                                    fullWidth
                                    className="mt-2"
                                    placeholder="Отзыв" 
                                />
                            </Grid>
                            <Grid item xs={12} className="text-center">
                                <Button type="button"
                                        className="text-white"
                                        accent="red"
                                        onClick={handleSubmit(this.handleSubmit)}>
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