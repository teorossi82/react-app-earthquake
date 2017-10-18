import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import axios from 'axios';

import { fetchEarthquakes } from '../../store/earthquake/earthquake.actions';
import { setLocation } from '../../store/location/location.actions';
import { Api } from '../../config';
import SearchBar from '../search_bar/search_bar';
import Map from '../maps/maps.MarkerClikable';

class SearchData extends Component {
	render() {
		const fetchCityGeocode = term => {
			axios.get(
				`${Api.google.geocodeUrl}address=${term}&key=${Api.google.key}`
			)
			.then(response => {
				if (response.data.status !== 'OK') {
					throw new Error('Get city coordinates error');
				}
				const location = {
					city: response.data.results[0].address_components.long_name,
					lat: response.data.results[0].geometry.location.lat,
					lng: response.data.results[0].geometry.location.lng
				};
				this.props.setLocation(location);
				prepareFetchEarthquake(location.lat, location.lng);
			})
			.catch(err => {
				console.log(err);
			});
		};

		const prepareFetchEarthquake = (latitude, longitude) => {
			const options = [
				{
					label: 'starttime',
					value: '1997-01-01'
				},
				{
					label: 'endtime',
					value: '2017-10-17'
				},
				{
					label: 'minmag',
					value: '4'
				},
				{
					label: 'lat',
					value: latitude
				},
				{
					label: 'lon',
					value: longitude
				},
				{
					label: 'limit',
					value: '50'
				}
			];
			this.props.fetchEarthquakes(options);
		};

		this.onSearchChange = term => {
			fetchCityGeocode(term);
		};

		return (
			<div className="search_data">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
						<SearchBar onSearchChange={debounce(this.onSearchChange, 500)} />
					</div>
				</div>
				<div className="row">
					<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Earthquakes' map</h3>
							</div>
							<div className="panel-body">
								<Map 
									markers={this.props.earthquakes} 
									centerLat={this.props.location.lat} 
									centerLng={this.props.location.lng} 
									zoom={5}
								/>
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Video</h3>
							</div>
							<div className="panel-body">
								Panel content
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ earthquakes, location }) => {
    return { earthquakes, location };
};

export default connect(mapStateToProps, { fetchEarthquakes, setLocation })(SearchData);
