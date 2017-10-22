import {
	SET_LOGIN_VALUE,
	LOGIN_USER,
	LOGOUT_USER
} from './login.types';

const INITIAL_STATE = localStorage.getItem('rae_user') ? 
	JSON.parse(localStorage.getItem('rae_user')) : 
	{
		username: '',
		password: '',
		isLoggedIn: false
	};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_LOGIN_VALUE:
			return {
				...state,
				[action.payload.field]: action.payload.value
			};
		case LOGIN_USER:
			localStorage.setItem('rae_user', JSON.stringify({username:state.username,password:state.password,isLoggedIn:true}));
			return {
				...state,
				isLoggedIn: true
			};
		case LOGOUT_USER:
			localStorage.removeItem('rae_user');
			return {
				...state,
				isLoggedIn: false
			};
		default:
			return state;
	}
};
