import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap
} from 'react-google-maps';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import moment from 'moment';

const getInfoStyle = (marker, active) => {
  const { mag } = marker;
  //const cs = mag < 4 ? { bg: 'yellow', zi: 1, s: 25 } : mag < 5 ? { bg: 'orange', zi: 2, s: 30 } : { bg: 'rgba(170, 170, 170, 0.6)', zi: 3, s: 35 };
  let cs = 1;
  switch (true) {
    case (mag < 3):
      cs = { bg: 'yellow', s: 15 };
      break;
    case (mag < 4):
      cs = { bg: 'yellow', s: 20 };
      break;
    case (mag < 5):
      cs = { bg: 'orange', s: 27 };
      break;
    case (mag < 6):
      cs = { bg: 'red', s: 35 };
      break;
    case (mag >= 6):
      cs = { bg: 'red', s: 40 };
      break;
  }
  const style = marker.id === active.id ?
                  { backgroundColor: '#F9F9F9', width: '100px', fontSize: '12px', padding: '5px' }
                    :
                  { border: '1px solid #aaa', Zindex: cs.zi, backgroundColor: cs.bg, fontSize: '14px', textAlign: 'center', width: `${cs.s}px`, height: `${cs.s}px`, lineHeight: `${cs.s}px`, borderRadius: `${cs.s / 2}px` };
  return style;
};

const getZIndex = (marker, active) => {
  if (marker.id === active.id) {
    return 100;
  }
  const { mag } = marker;
  let z = 1;
  switch (true) {
    case (mag < 3):
      z = 1;
      break;
    case (mag < 4):
      z = 2;
      break;
    case (mag < 5):
      z = 3;
      break;
    case (mag < 6):
      z = 4;
      break;
    default:
      z = 5;
  }
  return z;
};

const getContentLabel = (marker, active) => {
  const label = active.id === marker.id ? 
    `${marker.place} - ${moment(marker.date).format('HH:mm DD/MM/YY')} - ${marker.mag}`
      : 
    marker.mag;
  return label;
};

const MapWithAMarkerWithLabel = compose(
  withState('zoom', 'onZoomChange', 5),
  withHandlers(() => {
    const refs = {
      map: undefined,
    };

    return {
      onMapMounted: () => ref => {
        refs.map = ref;
      },
      onZoomChanged: ({ onZoomChange }) => () => {
        onZoomChange(refs.map.getZoom());
      }
    };
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={props.zoom}
    defaultCenter={props.center}
    ref={props.onMapMounted}
    onZoomChanged={props.onZoomChanged}
  >
    {props.markers.map(marker => {
      return (
        <MarkerWithLabel
          key={marker.id}
          position={{ lat: marker.lat, lng: marker.lng }}
          labelAnchor={new google.maps.Point(15, 35)}
          opacity={0}
          labelStyle={getInfoStyle(marker, props.activeMarker)}
          zIndex={getZIndex(marker, props.activeMarker)}
          onClick={() => props.onMarkerClick(marker)}
        >
          <div>{getContentLabel(marker, props.activeMarker)}</div>
        </MarkerWithLabel>
        );
    })}
  </GoogleMap>
);

class Map extends React.PureComponent {
  render() {
    return (
      <MapWithAMarkerWithLabel
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${this.props.Apikey}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: `${this.props.height || 550}px`, width: `${this.props.width}px` || '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        getInfoStyle={getInfoStyle}
        activeMarker={this.props.activeMarker}
        onMarkerClick={this.props.onMarkerClick}
        markers={this.props.markers || []} 
        center={this.props.center || { lat: 42, lng: 13 }} 
        zoom={this.props.zoom || 5} 
      />
    );
  }
}

export default Map;
