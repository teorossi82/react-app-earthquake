import { combineReducers } from 'redux';

import LoginReducer from './login/login.reducer.js';
import EarthquakeReducer from './earthquake/earthquake.reducer.js';
import SearchReducer from './search/search.reducer.js';
import VideoReducer from './video/video.reducer.js';

const Reducers = combineReducers({
	login: LoginReducer,
	earthquakes: EarthquakeReducer,
	search: SearchReducer,
	videos: VideoReducer
});

export default Reducers;

