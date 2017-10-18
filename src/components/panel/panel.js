import React from 'react';
import { Link } from 'react-router-dom';

import './panel.scss';

const Panel = () => {
	return (
		<div className="app-panel app-panel-left">
			<ul className="content-menu">
				<li className="block-menu">
					<Link to="/">Ricerca</Link>
				</li>
				<li className="block-menu">
					<Link to="/analyze">Analisi</Link>
				</li>
			</ul>
		</div>
	);
};

export default Panel;

