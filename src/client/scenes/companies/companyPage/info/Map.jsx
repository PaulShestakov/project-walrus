import React from 'react';
import {compose} from 'recompose';

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

const MapWithAMarker = compose(
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={props.location}>
        <Marker position={props.location}/>
    </GoogleMap>
);

export default MapWithAMarker;