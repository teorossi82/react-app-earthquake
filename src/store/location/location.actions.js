import {
    SET_LOCATION
} from './location.types';

export const setLocation = location => ({
	type: SET_LOCATION,
	payload: location
});

