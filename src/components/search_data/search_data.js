import React, { Component } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import axios from 'axios';
import moment from 'moment';
import YTSearch from 'youtube-api-search';

import { 
	fetchEarthquakes, 
	prepareFetchEarthquake } 
from '../../store/earthquake/earthquake.actions';
import { setLocation } from '../../store/location/location.actions';
import { Api } from '../../config';
import SearchBar from '../search_bar/search_bar';
import Map from '../maps/maps.MarkerClikable';
import CustomDatePicker from '../custom_date_picker/custom_date_picker';
import CustomSlider from '../custom_slider/custom_slider';
import VideoList from '../video_list/video_list';

class SearchData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			magnitude: 4,
			radius: 300,
			dateFrom: new Date(2017, 0, 1),
			dateTo: new Date(),
			activeMarker: {},
			videos: [],
			selectedVideo: null
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
					value: this.state.magnitude
				},
				{
					label: 'maxradiuskm',
					value: this.state.radius
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
					value: '100'
				}
			];
			this.props.fetchEarthquakes(options);
		};

		const videoSearch = term => {
			YTSearch({ key: Api.google.key, term }, videos => {
				this.setState({
					videos,
					selectedVideo: videos[0]
				});
			});
		};

		this.onSearchChange = term => {
			fetchCityGeocode(term);
			videoSearch(`earthquakes ${term}`);
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
						Apikey={Api.google.key}
						activeMarker={this.state.activeMarker}
						onMarkerClick={onMarkerClick}
					/>
				</div>
			);
		};

		const onMarkerClick = activeMarker => {
			if (this.state.activeMarker.id === activeMarker.id) {
				return this.setState({ activeMarker: {} });
			}
			this.setState({ activeMarker });
		};

		this.onSearchParamChange = (val, instance) => {
			const value = {};
			value[instance] = val;
			this.setState(value);
		};

		return (
			<div className="search_data">
				<div className="row">
					<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						<SearchBar 
							value={this.props.location.city}
							onSearchChange={debounce(this.onSearchChange, 500)} 
							onSearchEnter={this.onSearchChange}
						/>
					</div>
					<div className="content-date col-lg-4 col-md-4 col-sm-6 col-xs-12">
						<CustomDatePicker
							value={this.state.dateFrom}
							instance='dateFrom'
							onDateChange={this.onSearchParamChange}
						/>
					</div>
					<div className="content-date col-lg-4 col-md-4 col-sm-6 col-xs-12">
						<CustomDatePicker
							value={this.state.dateTo}
							instance='dateTo'
							onDateChange={this.onSearchParamChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="content-slider col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<CustomSlider 
							label="Magnitudo"
							min={2} 
							max={7}
							defaultValue={this.state.magnitude}
							dots
							color="red"
							dotStyle={{ borderColor: 'grey' }}
							railStyle={{ backgroundColor: 'grey' }}
							trackStyle={{ backgroundColor: 'red' }}
							instance="magnitude"
							onSliderChange={this.onSearchParamChange}
						/>
					</div>
					<div className="content-slider col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<CustomSlider 
							label="Raggio (Km)"
							min={100} 
							max={500}
							defaultValue={this.state.radius}
							instance="radius"
							railStyle={{ backgroundColor: 'grey' }}
							trackStyle={{ backgroundColor: '#337ab7' }}
							onSliderChange={this.onSearchParamChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
						<div className="panel panel-default panel-map">
							<div className="panel-heading">
								<h3 className="panel-title">Mappa dei terremoti</h3>
							</div>
							<div className="panel-body">
								{this.renderMap()}
							</div>
						</div>
					</div>
					<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						<div className="panel panel-default panel-videos">
							<div className="panel-heading">
								<h3 className="panel-title">Video</h3>
							</div>
							<div className="panel-body">
								<VideoList
									onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
									videos={this.state.videos}
								/>
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
