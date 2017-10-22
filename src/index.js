import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

import './index.scss';

import App from './App';

firebase.initializeApp({
	apiKey: 'AIzaSyAeyxZMgG2f2vl3QniGDqnV7MQDk_WVc-U',
    authDomain: 'react-app-earthquake.firebaseapp.com',
    databaseURL: 'https://react-app-earthquake.firebaseio.com',
    projectId: 'react-app-earthquake',
    storageBucket: 'react-app-earthquake.appspot.com',
    messagingSenderId: '123148207502'
});

ReactDOM.render(
	<App />, 
	document.getElementById('app')
);
