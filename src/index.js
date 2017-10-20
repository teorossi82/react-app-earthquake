import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import './index.scss';

import App from './App';
import Reducers from './store';

const middlewares = [ReduxThunk];

const store = createStore(
    Reducers,
    applyMiddleware(...middlewares)
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>, 
	document.getElementById('app')
);
