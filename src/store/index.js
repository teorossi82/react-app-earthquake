import { combineReducers } from 'redux';

import EarthquakeReducer from './earthquake/earthquake.reducer.js';
import LocationReducer from './location/location.reducer.js';

const Reducers = combineReducers({
	earthquakes: EarthquakeReducer,
	location: LocationReducer
});

export default Reducers;

