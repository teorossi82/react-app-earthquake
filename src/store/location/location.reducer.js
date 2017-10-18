import {
    SET_LOCATION
} from './location.types';

export default (state = { city: 'Matelica', lat: 40, lng: 13 }, action) => {
	switch (action.type) {
		case SET_LOCATION:
			return action.payload;
		default:
			return state;
	}
};
