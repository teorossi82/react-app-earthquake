import { combineReducers } from 'redux';

import EarthquakeReducer from './earthquake/earthquake.reducer.js';
import LocationReducer from './location/location.reducer.js';
import SearchReducer from './search/search.reducer.js';
import VideoReducer from './video/video.reducer.js';

const Reducers = combineReducers({
	earthquakes: EarthquakeReducer,
	location: LocationReducer,
	search: SearchReducer,
	videos: VideoReducer
});

export default Reducers;

