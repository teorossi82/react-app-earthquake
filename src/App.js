import React from 'react';
import { BrowserRouter, NavLink, Switch, Route, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import Header from './components/header/header';
import SearchData from './container/search_data/search_data';
import AnalyzeData from './container/analyze_data/analyze_data';
import Login from './container/login/login';

import Reducers from './store';

const middlewares = [ReduxThunk];

const store = createStore(
    Reducers,
    applyMiddleware(...middlewares)
);

function PrivateRoute({ component: Component, login, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => login.isLoggedIn === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
}

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
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
										<NavLink exact activeClassName="active" to="/">Ricerca</NavLink>
									</li>
									<li className="block-menu">
										<NavLink activeClassName="active" to="/analyze">Analisi</NavLink>
									</li>
								</ul>
							</div>
						</div>
						<div className="menu-content">
							<div className="block-menu">
								<NavLink exact activeClassName="active" to="/">Ricerca</NavLink>
							</div>
							<div className="block-menu">
								<NavLink activeClassName="active" to="/analyze">Analisi</NavLink>
							</div>
						</div>
						<div className="main-content col-md-10 col-sm-10 col-xs-12">
							<div className="main">
								<Switch>
									<Route path='/login' component={Login} />
									<PrivateRoute 
										login={store.getState().login} 
										exact 
										path="/" 
										component={SearchData} 
									/>
									<PrivateRoute 
										login={store.getState().login} 
										path="/analyze" 
										component={AnalyzeData} 
									/>
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
