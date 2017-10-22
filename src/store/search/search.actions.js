import {
	SET_SEARCH_VALUE
} from './search.types';

export const setSearchValue = (field, value) => ({
    type: SET_SEARCH_VALUE,
    payload: { field, value }
});
