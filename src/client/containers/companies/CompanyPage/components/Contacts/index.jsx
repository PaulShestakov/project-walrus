import React from 'react';
import { translate } from 'react-i18next';
import styles from './styles';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map, InfoDialog } from "components";
import {Divider, Typography, Paper, List, ListSubheader, ListItem} from "material-ui";
import LocationItem from "./LocationItem/index";

@translate(['common'])
@withStyles(styles)
export default class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMarker: 0,
            phones: []
        }
    }

    componentWillReceiveProps(nextProps) {
        const { match, locations } = nextProps;
        const selectedUrlId = match.params.filial_url_id || match.params.url_id;
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].url_id === selectedUrlId) {
                this.setState({ selectedMarker: i });
                break;
            }
        }
    }

    handlePhonesClick = (index) => {
        const { locations } = this.props;
        this.setState({ isPhonesDialogOpened: true, phones: locations[index].phones });
    };

    handleMarkerDblClick = (index) => {
        const location = this.props.locations[index];
        if (location && location.url) {
            this.props.history.push(location.url);
        }
    };

    handleMarkerClick = (index) => {
        this.setState({ selectedMarker: index });
    };

    render() {
        const { classes, locations = [], markers, match: {params: { companyCategoryId, companySubcategoryId, url_id  }} } = this.props;
        const baseUrl = `/company/${companyCategoryId}/${companySubcategoryId}/company/${url_id}`;
        locations.forEach(item => {
            let url = baseUrl;
            if (item.isMain === 0) {
                url += '/contacts/' + item.url_id;
            }
            item.url = url;
        });
        return (
            <div className="mt-3">
            {
                (locations && locations.length > 0) && (
                    <Paper>
                        <Grid container spacing={0}>
                            <Grid item xs={4}>
                                <List className={classes.list}
                                      subheader
                                      disablePadding>
                                    {
                                        locations.map((item, index) => {

                                            return (
                                                <ListItem
                                                    className={this.state.selectedMarker === index
                                                        ? classes.selectedLocation
                                                        : ''}
                                                    disableGutters
                                                    divider>
                                                    <LocationItem
                                                        item={item}
                                                        onPhonesClick={this.handlePhonesClick.bind(null, index)}/>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </Grid>
                            <Grid item xs={8}>
                                <Map extMarkers={markers}
                                     selected={this.state.selectedMarker}
                                     onMarkerClick={(index) => this.handleMarkerClick(index)}
                                     onDoubleClick={(index) => this.handleMarkerDblClick(index)}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                )
            }
            <InfoDialog
                open={this.state.isPhonesDialogOpened}
                title="Телефоны"
                closeCallback={() => this.setState({ isPhonesDialogOpened: false })}>
                {
                    this.state.phones.map(item => (
                        <div key={item.phoneId} className="mt-2">
                            <Label>{item.phone}</Label>
                        </div>
                    ))
                }
            </InfoDialog>
            </div>
        );
    }
}