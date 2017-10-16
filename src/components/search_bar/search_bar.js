import React, { Component } from 'react';

import './search_bar.scss';

class SearchBar extends Component {
	render() {
		return (
			<div className="search_bar form-group">
				<input type="text" className="form-control" placeholder="Cerca" />
			</div>
		);
	}
}

export default SearchBar;