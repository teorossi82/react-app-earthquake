import {
	SET_SEARCH_VALUE
} from './search.types';

const INITIAL_STATE = {
	location: { city: 'Matelica', lat: 42, lng: 13 },
	magnitude: 4,
	radius: 300,
	dateFrom: new Date(2016, 0, 1),
	dateTo: new Date()
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_SEARCH_VALUE:
			return {
				...state,
				[action.payload.field]: action.payload.value
			};
		default:
			return state;
	}
};
