import React from 'react';

import Header from './header/header';
import Panel from './panel/panel';
import Main from './main/main';

const App = () => {
	return (
		<div className="container-fluid">
			<Header 
				image="./src/assets/icon-earthquake.png" 
				label="Analisi terremoti"
				bg="bg-primary"
				color="#FFF"
			/>
			<div className="app-content row">
				<div className="panel-content bg-default col-md-2 col-sm-2 col-xs-1">
					<Panel />
				</div>
				<div className="main-content col-md-10 col-sm-10 col-xs-12">
					<Main />
				</div>
			</div>
		</div>
	);
};

export default App;
