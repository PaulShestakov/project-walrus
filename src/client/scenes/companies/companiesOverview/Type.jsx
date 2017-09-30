import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import styles from './styles';
import { Link } from 'react-router-dom';


@translate(['common'])
@withStyles(styles)
export default class Type extends React.Component {
    render() {
        const {t, classes, type, ...other} = this.props;

        return (
            <div className={classes.exactTypesContainer}>
                {
                    type.subcategories.map((subcategory, index) => {
                        return (
                            <div className={classes.exactTypeLinkWrapper}>
                                <Link key={index}
                                    className={classes.exactTypeLink}
                                    to={'/company/list' + location.search + "&companySubcategoryId=" + subcategory.value}>
                                    {subcategory.label}
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}