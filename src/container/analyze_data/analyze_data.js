import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import { Api } from '../../config';
import Map from '../../components/maps/maps.MarkerClikable';
import Spinner from '../../components/spinner/spinner';

class AnalyzeData extends Component {
	constructor(props) {
		super(props);

		const { data } = props.earthquakes;
		const eqks = data.slice(0, 5);
		this.state = {
			activeMarker: {},
			data: eqks,
			loading: false
		};
	}

	componentDidMount() {
		let index = 0;
		const arrayvar = this.state.data.slice();
		const fetchWeatherData = params => {
			axios.get(
				`${Api.weather.url}${params.lat},${params.lng},${moment(params.date).unix()}?exclude=daily,currently,flags&lang=it&units=si`
			)
			.then(response => {
				setWheaterAndFetch(response.data);
			})
			.catch(err => {
				console.log(err);
				setWheaterAndFetch(false);
			});
		};

		const setWheaterAndFetch = wheater => {
			arrayvar[index].weather = wheater;
			index++;
			if (index === this.state.data.length) {
				this.setState({ data: arrayvar, loading: false });
				return;
			}
			fetchWeatherData(this.state.data[index]);
		};
		if (this.state.data && this.state.data.length) {
			this.setState({ loading: true });
			fetchWeatherData(this.state.data[index]);
		}
	}

	render() {
		const mapWheaterIcon = weather => {
			const icons = {
				'clear-day': 'wi-day-sunny',
				'clear-night': 'wi-night-clear',
				rain: 'wi-day-rain',
				snow: 'wi-day-snow',
				sleet: 'wi-day-sleet',
				wind: 'wi-day-windy',
				fog: 'wi-day-fog',
				cloudy: 'wi-cloudy',
				'partly-cloudy-day': 'wi-day-cloudy',
				'partly-cloudy-night': 'wi-night-cloudy'
			};
			return icons[weather] || 'wi-day-cloudy';
		};

		const renderWeather = (weather, time) => {
			if (this.state.loading) {
				return <Spinner />;
			}
			if (!weather) {
				return <p>N/A</p>;
			}
			const hour = moment(time).hour();
			const { icon, summary } = weather.hourly.data[hour];
			return (
				<div className="block-weather">
					<span 
						className={`w-icon wi 
							${mapWheaterIcon(icon)} 
							${hour > 7 && hour < 18 ? 'day' : 'night'}`} 
					/>
					<div className="block-summary">{summary}</div>
				</div>
			);
		};

		const renderWeatherData = (weather, time) => {
			if (this.state.loading) {
				return <Spinner />;
			}
			if (!weather) {
				return <p>N/A</p>;
			}
			const hour = moment(time).hour();
			const { temperature, windSpeed, humidity } = weather.hourly.data[hour];
			return (
				<div className="block-weather-data">
					<div className="single-block block-weather-line">
						{renderWeather(weather, time)}
					</div>
					<div className="single-block block-temperature">
						<span 
							className={
								`w-icon wi ${temperature >= 14 ? 
									'wi-thermometer hot' : 'wi-thermometer-exterior cold'}`
							} 
						/>
						<span className="w-label">
							{temperature} <span className="block-degrees wi wi-celsius" />
						</span>
					</div>
					<div className="single-block block-wind">
						<span 
							className={`w-icon wi ${windSpeed >= 8 ? 'wi-strong-wind' : 'wi-windy'}`} 
						/>
						<span className="w-label">{windSpeed} <span className="block-ext">Km/H</span></span>
					</div>
					<div className="single-block block-humidity">
						<span 
							className="w-icon wi wi-raindrop"
						/>
						<span className="w-label">{humidity} <span className="block-ext">%</span></span>
					</div>
				</div>
			);
		};

		const renderDatas = () => {
			if (!this.state.data || !this.state.data.length) {
				return (
					<h4>Esegui una ricerca per poter analizzare i dati</h4>
				);
			}
			return this.state.data.map(earthquake => {
				return (
					<div className="content-data row" key={earthquake.id}>
						<div className="content-map col-lg-4 col-md-4 col-sm-4 col-xs-7">
							<div className="block-time">
								<span className="fa fa-calendar" />
								{moment(earthquake.date).format('HH:mm DD/MM/YYYY')}
							</div>
							{renderMap(earthquake)}
						</div>
						<div className="content-flex content-w-data col-lg-4 col-md-4 col-sm-4 col-xs-5">
							{renderWeatherData(earthquake.weather, earthquake.date)}
						</div>
						<div className="content-flex content-weather col-lg-4 col-md-4 col-sm-4">
							{renderWeather(earthquake.weather, earthquake.date)}
						</div>
					</div>
				);
			});
		};

		const renderMap = earthquake => {
			return (
				<div>
					<Map 
						markers={[earthquake]} 
						center={earthquake}  
						zoom={5}
						Apikey={Api.google.key}
						activeMarker={this.state.activeMarker}
						onMarkerClick={onMarkerClick}
						height={150}
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

		return (
			<div className="analyze_data">
				<div className="panel panel-default panel-map">
					<div className="panel-heading">
						<h3 className="panel-title">Terremoti e meteo</h3>
					</div>
					<div className="panel-body">
						{renderDatas()}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ earthquakes, location }) => {
    return { earthquakes, location };
};

export default connect(mapStateToProps, null)(AnalyzeData);
