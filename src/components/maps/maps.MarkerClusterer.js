import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB_Tvt64ONthM2s9ZXU2QQ-qmuJYdw6QgY&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.center}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

class Map extends React.PureComponent {
  render() {
    return (
      <MapWithAMarkerClusterer 
        markers={this.props.markers || []} 
        center={this.props.center || { lat: 40, lng: 13 }} 
        zoom={this.props.zoom || 5} 
      />
    );
  }
}

export default Map;
