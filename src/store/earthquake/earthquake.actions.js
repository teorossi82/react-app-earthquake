import axios from 'axios';

import {
	PREPARE_FETCH_EARTHQUAKES,
    FETCH_EARTHQUAKES_FAILED,
    FETCH_EARTHQUAKES_SUCCESS
} from './earthquake.types';
import { Api } from '../../config';

const mapField = [
	{
		index: 0,
		field: 'id'
	},
	{
		index: 1,
		field: 'date'
	},
	{
		index: 2,
		field: 'lat',
		num: true
	},
	{
		index: 3,
		field: 'lng',
		num: true
	},
	{
		index: 10,
		field: 'mag',
		num: true
	},
	{
		index: 12,
		field: 'place'
	}
];
function CSVToArray(strData, strDelimiter) {
	const arrObjects = strData.split('\n');
	const arrParsed = [];
	for (let i = 1; i < arrObjects.length - 1; i++) {
		try {
			const arrLine = arrObjects[i].split(strDelimiter);
			const obj = {};
			for (let j = 0; j < mapField.length; j++) {
				obj[mapField[j].field] = mapField[j].num ? 
					parseFloat(arrLine[mapField[j].index]) : arrLine[mapField[j].index];
			}
			arrParsed.push(obj);
		} catch (err) {
			console.log(err);
		}
	}
	const sorted = arrParsed.sort(compareValues('mag'));
	return sorted;
}

function compareValues(key, order = 'desc') {
	return function (a, b) {
		if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			return 0; 
		}
		const varA = (typeof a[key] === 'string') ? 
			a[key].toUpperCase() : a[key];
		const varB = (typeof b[key] === 'string') ? 
			b[key].toUpperCase() : b[key];
		let comparison = 0;
		if (varA > varB) {
			comparison = 1;
		} else if (varA < varB) {
			comparison = -1;
		}
		return (
			(order === 'desc') ? (comparison * -1) : comparison
		);
	};
}

export const prepareFetchEarthquake = () => ({
	type: PREPARE_FETCH_EARTHQUAKES,
	payload: ''
});

export const fetchEarthquakes = options => {
	let query = '';
	options.forEach(option => {
		query += `&${option.label}=${option.value}`;
	});
	if (query) {
		query += '&';
	}
    return (dispatch) => {
		axios.get(
			`${Api.ingv.url}${query}format=text`
		)
		.then(response => {
			const earthquakes = CSVToArray(response.data, '|');
			dispatch(fetchEarthquakesSuccess(earthquakes));
		})
		.catch(err => {
			dispatch(fetchEarthquakesFailed(err));
		});
    };
};

export const fetchEarthquakesSuccess = earthquakes => ({
	type: FETCH_EARTHQUAKES_SUCCESS,
	payload: earthquakes
});

export const fetchEarthquakesFailed = err => ({
    type: FETCH_EARTHQUAKES_FAILED,
    payload: err
});
