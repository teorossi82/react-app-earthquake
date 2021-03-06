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
import { setSearchValue } from '../../store/search/search.actions';
import { setVideo } from '../../store/video/video.actions';
import { Api } from '../../config';
import SearchBar from '../../components/search_bar/search_bar';
import Spinner from '../../components/spinner/spinner';
import Map from '../../components/maps/maps.MarkerClikable';
import CustomDatePicker from '../../components/custom_date_picker/custom_date_picker';
import CustomSlider from '../../components/custom_slider/custom_slider';
import VideoList from '../../components/video_list/video_list';

class SearchData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeMarker: {},
			selectedVideo: null
		};
	}

	componentDidMount() {
		if (this.props.earthquakes.data.length) {
			return;
		}
		const { city } = this.props.search.location;
		this.fetchCityGeocode(city);
		this.videoSearch(`earthquakes ${city}`);
	}

	render() {
		this.fetchCityGeocode = term => {
			axios.get(
				`${Api.google.geocodeUrl}address=${term}&key=${Api.google.key}`
			)
			.then(response => {
				if (response.data.status !== 'OK') {
					throw new Error('Get city coordinates error');
				}
				const location = {
					city: response.data.results[0].address_components[0].long_name,
					lat: response.data.results[0].geometry.location.lat,
					lng: response.data.results[0].geometry.location.lng
				};
				this.props.setSearchValue('location', location);
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
					value: moment(this.props.search.dateFrom).format('YYYY-MM-DD')
				},
				{
					label: 'endtime',
					value: moment(this.props.search.dateTo).format('YYYY-MM-DD')
				},
				{
					label: 'minmag',
					value: this.props.search.magnitude
				},
				{
					label: 'maxradiuskm',
					value: this.props.search.radius
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

		this.videoSearch = term => {
			YTSearch({ key: Api.google.key, term }, videos => {
				this.props.setVideo(videos);
				this.setState({
					selectedVideo: videos[0]
				});
			});
		};

		const onSearchChange = term => {
			this.fetchCityGeocode(term);
			this.videoSearch(`earthquakes ${term}`);
		};

		const renderMap = () => {
			if (this.props.earthquakes && this.props.earthquakes.loading) {
				return <Spinner />
			}
			return (
				<div>
					<div className="">Sono stati trovati {this.props.earthquakes.data.length} eventi</div>
					<Map 
						markers={this.props.earthquakes.data} 
						center={this.props.search.location}  
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

		const onSearchParamChange = (val, instance) => {
			this.props.setSearchValue(instance, val);
		};

		return (
			<div className="search_data">
				<div className="row">
					<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
						<SearchBar 
							value={this.props.search.location.city}
							onSearchChange={debounce(onSearchChange, 500)} 
							onSearchEnter={onSearchChange}
						/>
					</div>
					<div className="content-date col-lg-4 col-md-4 col-sm-6 col-xs-12">
						<CustomDatePicker
							value={this.props.search.dateFrom}
							instance='dateFrom'
							onDateChange={onSearchParamChange}
						/>
					</div>
					<div className="content-date col-lg-4 col-md-4 col-sm-6 col-xs-12">
						<CustomDatePicker
							value={this.props.search.dateTo}
							instance='dateTo'
							onDateChange={onSearchParamChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="content-slider col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<CustomSlider 
							label="Magnitudo"
							min={2} 
							max={7}
							defaultValue={this.props.search.magnitude}
							dots
							color="red"
							dotStyle={{ borderColor: 'grey' }}
							railStyle={{ backgroundColor: 'grey' }}
							trackStyle={{ backgroundColor: 'red' }}
							instance="magnitude"
							onSliderChange={onSearchParamChange}
						/>
					</div>
					<div className="content-slider col-lg-6 col-md-6 col-sm-6 col-xs-6">
						<CustomSlider 
							label="Raggio (Km)"
							min={100} 
							max={500}
							defaultValue={this.props.search.radius}
							instance="radius"
							railStyle={{ backgroundColor: 'grey' }}
							trackStyle={{ backgroundColor: '#337ab7' }}
							onSliderChange={onSearchParamChange}
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
								{renderMap()}
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
									videos={this.props.videos}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ earthquakes, search, videos }) => {
    return { earthquakes, search, videos };
};

export default connect(mapStateToProps, 
	{ fetchEarthquakes, prepareFetchEarthquake, setSearchValue, setVideo }
)(SearchData);
