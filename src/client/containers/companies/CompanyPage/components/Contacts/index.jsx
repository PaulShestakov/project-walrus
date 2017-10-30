import React from 'react';
import { translate } from 'react-i18next';
import styles from './styles';
import { withStyles } from 'material-ui/styles';
import { Dropdown, Button, Title, Label, Input, Grid, ImageUploader, TextField, Tabs, Tab, Card, Map } from "components";
import {Divider, Typography, Paper, List, ListSubheader, ListItem} from "material-ui";
import LocationItem from "./LocationItem/index";


@translate(['common'])
@withStyles(styles)
export default class Contacts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            markers: [],
            selectedMarker: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.markers.length === 0 && nextProps.locations) {
            this.setState({
                markers: nextProps.locations.reduce((acc, item) => {
                    acc.push({
                        position: item.position,
                        isOpen: false,
                        isMain: item.isMain,
                        markerInfo: (
                            <div>
                                {
                                    item.phones.map(phone => (
                                        <div>
                                            {phone.phone}
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    });
                    return acc;
                }, [])
            });
        }
    }

    handleMarkerClick = (index) => {
        const { markers } = this.state;
        markers[index].isOpen = !markers[index].isOpen;
        this.setState({ markers, selectedMarker: index });
    };

    render() {
        const { t, classes, locations = [] } = this.props;
        const { markers } = this.state;
        return (
            <div>
            {
                locations.length > 0 && (
                    <Paper>
                        <Grid container spacing={0}>
                            <Grid item xs={4}>
                                <List className={classes.list}
                                      subheader
                                      disablePadding>
                                    {
                                        locations.map((item, index) => (
                                            <ListItem
                                                disableGutters
                                                divider>
                                                <LocationItem
                                                    item={item}
                                                    onLocationClick={() => this.handleMarkerClick(index)}/>
                                            </ListItem>
                                        ))
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
            </div>
        );
    }
}