import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logout } from '../../store/login/login.actions';

class LogoutBtb extends Component {
	render() {
		if (!this.props.login.isLoggedIn) {
			return <div />;
		}
		return (
			<div 
				className="btn btn-default btn-logout"
				onClick={this.props.logout}
			>
				<span className="fa fa-sign-out" /> 
				<span className="label">Logout</span>
			</div>
		);
	}
}

const mapStateToProps = ({ login }) => {
    return { login };
};

export default connect(mapStateToProps, { logout })(LogoutBtb);
