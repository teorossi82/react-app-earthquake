import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchData from '../search_data/search_data';
import AnalyzeData from '../analyze_data/analyze_data';

const Main = () => (
  <div className="main">
    <Switch>
      <Route exact path="/" component={SearchData} />
      <Route path="/analyze" component={AnalyzeData} />
    </Switch>
  </div>
);

export default Main;

