import React from 'react';
import _ from 'lodash';
import { translate } from 'react-i18next';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import { PlusOne } from 'material-ui-icons';
import SwipeableViews from 'react-swipeable-views';
import {Divider, Typography, Paper} from "material-ui";

import { Field, Fields, FieldArray } from 'redux-form'


@translate(['common'])
export default class WorkingTimes extends React.Component {

    constructor(props) {
        super(props);
    }

    // componentWillReceiveProps(nextProps) {
    //     const { fields, daysOfWeek } = nextProps;
    //     if (daysOfWeek && fields.length === 0) {
    //         daysOfWeek.forEach(day => {
    //             fields.push({
    //                 "workingTimes": [
    //                     day
    //                 ]
    //             });
    //         });
    //     }
    // }

    render() {
        const {t, classes, fields, common, ...other} = this.props;
        return (
            <div>
                {
                    fields.map((member, index) => (
                        <div>
                            {member}
                        </div>
                    ))
                }
            </div>
        );
    }
}