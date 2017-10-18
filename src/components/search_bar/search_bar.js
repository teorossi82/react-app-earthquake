import React, { Component } from 'react';

import './search_bar.scss';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: '' };
	}

	render() {
		this.onChange = term => {
			this.setState({ term });
			this.props.onSearchChange(term);
		};

		return (
			<div className="search_bar form-group">
				<input 
					value={this.state.term}
					type="text" 
					className="form-control" 
					placeholder="Cerca" 
					onChange={ev => this.onChange(ev.target.value)}
				/>
			</div>
		);
	}
}

export default SearchBar;
