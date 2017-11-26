import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import moment from 'moment';
import styles from './styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Call } from 'material-ui-icons';

@translate(['common'])
@withStyles(styles)
export default class LocationItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            todayWorking: '',
        };
    }

    componentDidMount() {
        const { item } = this.props;
        const today = moment().isoWeekday();
        let todayWorking;
        if (item.workingTimes && item.workingTimes.length > 0) {
            todayWorking = item.workingTimes.find(time => {
                const day = moment().isoWeekday(time.dayOfWeek).isoWeekday();
                return day === today;
            });
        }
        todayWorking = todayWorking
            ? `до ${todayWorking.close.substring(0, todayWorking.close.lastIndexOf(":"))}`
            : 'не работает';
        this.setState({
            todayWorking,
            address: `г. ${item.cityName ? item.cityName : ''} : ${item.address}`
        });
    }

    render() {
        const { item, classes, onPhonesClick } = this.props;

        return (
            <Grid container spacing={0}
                  className={classNames("w-100 px-2 py-1")}
                  key={item.id}>
                <Grid item xs={8}>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            {this.state.address}
                        </Grid>
                        <Grid item xs={12} className={classes.workingTime}>
                            Сегодня {this.state.todayWorking}
                        </Grid>
                        <Grid item xs={12} >
                            <Link to={item.url} style={{textDecoration: 'underline'}}>
                                На страницу филиала
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} className="d-flex align-items-center justify-content-center">
                    <Card className={classes.callIcon} onClick={onPhonesClick}>
                        <Call />
                    </Card>
                </Grid>
            </Grid>
        )
    }
}