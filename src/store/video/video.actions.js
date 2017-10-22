import {
    SET_VIDEO
} from './video.types';

export const setVideo = video => ({
	type: SET_VIDEO,
	payload: video
});

