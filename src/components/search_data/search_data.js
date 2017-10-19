import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import axios from 'axios';
import moment from 'moment';

import { fetchEarthquakes, prepareFetchEarthquake } from '../../store/earthquake/earthquake.actions';
import { setLocation } from '../../store/location/location.actions';
import { Api } from '../../config';
import SearchBar from '../search_bar/search_bar';
import Map from '../maps/maps.MarkerClikable';
import CustomDatePicker from '../custom_date_picker/custom_date_picker';

class SearchData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dateFrom: new Date(2017, 0, 1),
			dateTo: new Date()
		};
	}
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
				this.props.prepareFetchEarthquake();
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
					value: moment(this.state.dateFrom).format('YYYY-MM-DD')
				},
				{
					label: 'endtime',
					value: moment(this.state.dateTo).format('YYYY-MM-DD')
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

		this.renderMap = () => {
			if (this.props.earthquakes && this.props.earthquakes.loading) {
				return <div>Loading...</div>;
			}
			return (
				<div>
					<div className="">Sono stati trovati {this.props.earthquakes.data.length} eventi</div>
					<Map 
						markers={this.props.earthquakes.data} 
						center={this.props.location}  
						zoom={5}
					/>
				</div>
			);
		};

		this.onDateChange = (date, instance) => {
			const value = {};
			value[instance] = date;
			this.setState(value);
		};

		return (
			<div className="search_data">
				<div className="row">
					<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						<SearchBar onSearchChange={debounce(this.onSearchChange, 500)} />
					</div>
					<div className="content-date col-lg-4 col-md-4 col-sm-6 col-xs-6">
						<CustomDatePicker
							value={this.state.dateFrom}
							instance='dateFrom'
							onDateChange={this.onDateChange}
						/>
					</div>
					<div className="content-date col-lg-4 col-md-4 col-sm-6 col-xs-6">
						<CustomDatePicker
							value={this.state.dateTo}
							instance='dateTo'
							onDateChange={this.onDateChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
						<div className="panel panel-default">
							<div className="panel-heading">
								<h3 className="panel-title">Earthquakes' map</h3>
							</div>
							<div className="panel-body">
								{this.renderMap()}
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

export default connect(mapStateToProps, { fetchEarthquakes, prepareFetchEarthquake, setLocation })(SearchData);
