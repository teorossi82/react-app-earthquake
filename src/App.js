import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Header from './components/header/header';
import SearchData from './container/search_data/search_data';
import AnalyzeData from './container/analyze_data/analyze_data';

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
				</div>
				<div className="main-content col-md-10 col-sm-10 col-xs-12">
					<div className="main">
						<Switch>
							<Route exact path="/" component={SearchData} />
							<Route path="/analyze" component={AnalyzeData} />
						</Switch>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
