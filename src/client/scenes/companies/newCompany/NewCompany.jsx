import React from 'react';
import { translate } from 'react-i18next';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card } from "components";
import styles from './styles';


@translate(['common'])
@withStyles(styles)
export default class NewCompany extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadCompanyCategories();
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {t, classes, match, common, ...other} = this.props;

        return (
            <Card className="mt-4">

            </Card>
        );
    }
}