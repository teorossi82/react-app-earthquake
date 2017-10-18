import {
    FETCH_EARTHQUAKES_FAILED,
    FETCH_EARTHQUAKES_SUCCESS
} from './earthquake.types';

export default (state = [], action) => {
	switch (action.type) {
		case FETCH_EARTHQUAKES_SUCCESS:
			return action.payload;
		case FETCH_EARTHQUAKES_FAILED:
			return action.payload;
		default:
			return state;
	}
};
