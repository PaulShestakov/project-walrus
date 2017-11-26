import React from 'react';

import { compose, withProps, lifecycle, withHandlers, withState  } from "recompose";
import markerImg from '../../assets/img/marker2.png';
import markerMain from '../../assets/img/marker_main.png';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import * as _ from "lodash";

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAAkCnTdaLMXMVm60JLU8gleU468DfN-Qk",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({

        bounds: null,
        fitted: false,

        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        fitMapBounds: () => {
          const bounds = new google.maps.LatLngBounds();
          if (this.props.extMarkers && this.props.extMarkers.length > 0) {
              this.props.extMarkers.forEach(marker => {
                  bounds.extend(new google.maps.LatLng(marker.position));
              });
              refs.map.fitBounds(bounds);
          }
        },
        onTilesLoaded: () => {
          if (!this.state.fitted && this.props.extMarkers.length > 0) {
            this.state.fitMapBounds();
            this.state.fitted = true;
          }
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          if (this.props.onMarkersChanged) {
              this.props.onMarkersChanged(nextMarkers);
          }

          this.state.fitMapBounds();
          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={5}
    ref={props.onMapMounted}
    defaultCenter={props.mapCenter ? props.mapCenter : {lat:0,lng:0}}
    onTilesLoaded={props.onTilesLoaded}
  >
    {
      props.search &&
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Введите адрес"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            margin: `10px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
    }
    {
      props.extMarkers.map((marker, index) =>  {
        let markerProps;
        if (index === props.selected) {
          markerProps = {
              url: markerMain,
              width: 50,
              height: 75
          };
        } else {
          markerProps = {
              url: markerImg,
              width: 40,
              height: 60
          }
        }
        return (
            <Marker key={index}
                    position={marker.position}
                    icon={{
                        url: markerProps.url,
                        scaledSize: new google.maps.Size(markerProps.width, markerProps.height)
                    }}
                    onClick={() => props.onMarkerClick(index)}
                    onDblClick={() => props.onDoubleClick(index)}>
                {
                    marker.isOpen && marker.markerInfo &&
                    <InfoWindow onCloseClick={() => props.onMarkerClick(index)}>
                        {
                            marker.markerInfo
                        }
                    </InfoWindow>
                }
            </Marker>
          );
        }
      )
    }
  </GoogleMap>
));

export default MapWithASearchBox;