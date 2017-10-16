import React from 'react';

import Header from './header/header';
import Panel from './panel/panel';
import Main from './main/main';

const App = () => {
	return (
		<div className="container-fluid">
			<Header />
			<div className="app-content row">
				<div className="panel-content bg-default col-md-2 col-sm-2 col-xs-10">
					<Panel />
				</div>
				<div className="main-content col-md-9 col-sm-9 col-xs-12">
					<Main />
				</div>
			</div>
		</div>
	);
};

export default App;
