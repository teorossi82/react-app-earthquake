import React, { Component } from 'react';
import { connect } from 'react-redux';

import './login.scss';

import * as actions from '../../store/login/login.actions';

class Login extends Component {
	render() {
		if (this.props.login.isLoggedIn) {
			window.location.href = '/';
		}

		const onKeyPress = event => {
			if (event.key === 'Enter') {
				fetchLogin();
			}
		};

		const setInputValue = (field, value) => {
			this.props.setLoginValue(field, value);
		};

		const fetchLogin = () => {
			this.props.loginUserSuccess();
		};

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
						<div 
							className="btn btn-block login loginmodal-submit"
							onClick={fetchLogin}
						>
							Accedi
						</div>
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
