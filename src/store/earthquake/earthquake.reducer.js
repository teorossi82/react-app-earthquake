import {
	PREPARE_FETCH_EARTHQUAKES,
    FETCH_EARTHQUAKES_FAILED,
    FETCH_EARTHQUAKES_SUCCESS
} from './earthquake.types';

const INITIAL_STATE = {
	loading: false,
	error: false,
	data: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PREPARE_FETCH_EARTHQUAKES:
			return {
				...state,
				loading: true,
				error: false,
				data: []
			};
		case FETCH_EARTHQUAKES_SUCCESS:
			return {
				...state,
				loading: false, 
				data: action.payload 
			};
		case FETCH_EARTHQUAKES_FAILED:
			return {
				...state, 
				loading: false, 
				error: action.payload 
			};
		default:
			return state;
	}
};
