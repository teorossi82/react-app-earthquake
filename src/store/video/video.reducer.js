import {
    SET_VIDEO
} from './video.types';

export default (state = [], action) => {
	switch (action.type) {
		case SET_VIDEO:
			return action.payload;
		default:
			return state;
	}
};
