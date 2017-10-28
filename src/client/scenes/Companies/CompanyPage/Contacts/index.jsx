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
            markers: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.markers.length === 0 && nextProps.locations) {
            this.setState({
                markers: nextProps.locations.reduce((acc, item) => {
                    acc.push({
                        position: item.position,
                        isOpen: false
                    });
                    return acc;
                }, [])
            });
        }
    }

    handleMarkerClick = (index) => {
        const { markers } = this.state;
        markers[index].isOpen = !markers[index].isOpen;
        this.setState({ markers });
    };

    render() {
        const {t, classes, locations = [], ...other} = this.props;
        const { markers } = this.state;
        console.log(markers);
        return (
            <div className="my-4">
            {
                locations.length > 0 && (
                    <Paper>
                        <Grid container spacing={0}>
                            <Grid item xs={4}>
                                <List className={classes.list}
                                      subheader
                                      disablePadding
                                      dense>
                                    {
                                        locations.map((item, index) => (
                                            <ListItem>
                                                <LocationItem
                                                    item={item}
                                                    onLocationClick={() => this.handleMarkerClick(index)}/>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </Grid>
                            <Grid item xs={8}>
                                {
                                    markers.length > 0 && <Map extMarkers={markers}
                                                               onMarkerClick={(index) => this.handleMarkerClick(index)}
                                    /> ||
                                        <div>
                                            Положение не задано
                                        </div>
                                }

                            </Grid>
                        </Grid>
                    </Paper>
                )
            }
            </div>
        );
    }
}