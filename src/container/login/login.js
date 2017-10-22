import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import firebase from 'firebase';

import './login.scss';

import Spinner from '../../components/spinner/spinner';
import * as actions from '../../store/login/login.actions';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			error: false
		};
	}
	render() {
		const onKeyPress = event => {
			if (event.key === 'Enter') {
				const { username, password } = this.props.login;
				fetchLogin(username, password);
			}
		};

		const setInputValue = (field, value) => {
			this.props.setLoginValue(field, value);
		};

		const fetchLogin = (username, password) => {
			this.setState({ loading: true, error: false });
			setTimeout(() => {
				firebase.auth().signInWithEmailAndPassword(username, password)
				.then(() => {
					loginSuccess();
				})
				.catch(() => {
					firebase.auth().createUserWithEmailAndPassword(username, password)
					.then(() => {
						loginSuccess();
					})
					.catch(err => {
						loginFailed(err);
					});
				});
			}, 500);
		};

		const loginSuccess = () => {
			this.setState({ loading: false });
			this.props.loginUserSuccess();
		};

		const loginFailed = err => {
			const objErr = {
				'auth/invalid-email': 'Email non valida',
				'auth/email-already-in-use': 'Account esistente/password sbagliata'
			};
			const error = objErr[err.code] || 'Errore durante il login';
			this.setState({ loading: false, error });
		};

		if (this.props.login.isLoggedIn) {
			return (
				<Redirect to={{ pathname: '/' }} />
			);
		}

		return (
			<div className="box-view login">
				<div className="loginmodal-container">
					<h1>Accedi con i tuoi dati</h1>
					<div>
						<input 
							type="text" 
							name="user" 
							value={this.props.login.username}
							placeholder="Username" 
							onChange={ev => setInputValue('username', ev.target.value)}
							onKeyPress={onKeyPress}
						/>
						<input 
							type="password" 
							name="pass" 
							value={this.props.login.password}
							placeholder="Password" 
							onChange={ev => setInputValue('password', ev.target.value)}
							onKeyPress={onKeyPress}
						/>
						<div className="block-error">{this.state.error}</div>
						{this.state.loading ? 
							<div className="block-loading">
								<Spinner />
							</div>
							: <div 
								className="btn btn-block login loginmodal-submit"
								onClick={fetchLogin}
							>
								Accedi
							</div>}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ login }) => {
    return { login };
};

export default connect(mapStateToProps, actions)(Login);
