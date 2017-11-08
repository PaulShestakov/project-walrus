import React from 'react';
import { translate } from 'react-i18next';
import styles from './styles';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map, InfoDialog } from "components";
import {Divider, Typography, Paper, List, ListSubheader, ListItem} from "material-ui";
import LocationItem from "./LocationItem/index";
import {Route, Link} from 'react-router-dom'

@translate(['common'])
@withStyles(styles)
export default class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedMarker: 0,
            isPhonesDialogOpened: false,
        }
    }

    handleMarkerClick = (index) => {
        this.setState({ selectedMarker: index, isPhonesDialogOpened: true });
    };

    render() {
        const { classes, locations = [], markers, match } = this.props;
        const { selectedMarker } = this.state;
        return (
            <div className="mt-3">
            {
                locations.length > 0 && (
                    <Paper>
                        <Grid container spacing={0}>
                            <Grid item xs={4}>
                                <List className={classes.list}
                                      subheader
                                      disablePadding>
                                    {
                                        locations.map((item, index) => {
                                            let url = match.url;
                                            if (item.isMain === 0) {
                                                url += `/contacts/${item.url_id}`;
                                            }
                                            return (
                                                <ListItem
                                                    disableGutters
                                                    divider>
                                                    <Link to={url}>
                                                        <LocationItem
                                                            item={item}
                                                            onPhonesClick={() => this.handleMarkerClick(index)}/>
                                                    </Link>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </Grid>
                            <Grid item xs={8}>
                                <Map extMarkers={markers}
                                     onMarkerClick={(index) => this.handleMarkerClick(index)}
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
                    locations[selectedMarker] &&
                    locations[selectedMarker].phones.map(item => (
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