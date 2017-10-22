import React from 'react';

import './header.scss';

import LogoutBtn from '../logoutBtn/logoutBtn';

const Header = ({ image, label, bg, color }) => {
	return (
		<div className="app-header">
			<nav 
				className={`navbar navbar-default ${bg || 'bg-default'}`} 
			>
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="">
							<img alt="Earthquake" src={image} />
						</a>
						<p className="navbar-text" style={{ color: `${color || '#000'}` }}>{label}</p>
					</div>
					<div className="block-btn-right">
						<LogoutBtn />
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;

