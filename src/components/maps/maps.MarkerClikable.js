import React from 'react';
import { compose } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from 'react-google-maps';

import { Api } from '../../config';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';

const getInfoStyle = marker => {
  const { mag } = marker;
  const cs = mag < 4 ? { bg: 'yellow', zi: 1, s: 25 } : mag < 5 ? { bg: 'orange', zi: 2, s: 30 } : { bg: 'red', zi: 3, s: 35 };
  const style = { Zindex: cs.zi, backgroundColor: cs.bg, fontSize: `14px`, textAlign: 'center', width: `${cs.s}px`, height: `${cs.s}px`, lineHeight: `${cs.s}px`, borderRadius: `${cs.s/2}px` };
  return style;
};

const getZIndex = marker => {
  const { mag } = marker;
  const z = mag < 4 ? 1 : mag < 5 ? 2 : 3;
  return z;
};

const MapWithAMarkerWithLabel = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.center}
  >
    {props.markers.map(marker => (
      <MarkerWithLabel
        key={marker.id}
        opacity={0}
        position={{ lat: marker.lat, lng: marker.lng }}
        labelAnchor={new google.maps.Point(0, 0)}
        labelStyle={getInfoStyle(marker)}
        zIndex={getZIndex(marker)}
      >
        <div>{marker.mag || 0}</div>
      </MarkerWithLabel>
    ))}
  </GoogleMap>
);

class Map extends React.PureComponent {
  render() {
    return (
      <MapWithAMarkerWithLabel
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${Api.google.key}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        getInfoStyle={getInfoStyle}
        markers={this.props.markers || []} 
        center={this.props.center || { lat: 40, lng: 13 }} 
        zoom={this.props.zoom || 5} 
      />
    );
  }
}

export default Map;
