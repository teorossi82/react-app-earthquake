import React from 'react';

import './header.scss';

const Header = () => {
	return (
		<div className="app-header">
			<nav className="navbar navbar-default bg-primary">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#">
							<img alt="Earthquake" src="" />
						</a>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Header;

