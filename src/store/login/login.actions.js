import {
	SET_LOGIN_VALUE,
	LOGIN_USER,
	LOGOUT_USER
} from './login.types';

export const setLoginValue = (field, value) => ({
    type: SET_LOGIN_VALUE,
    payload: { field, value }
});

export const loginUserSuccess = () => ({
    type: LOGIN_USER,
    payload: ''
});

export const logout = () => ({
    type: LOGOUT_USER,
    payload: ''
});
