import React, { Component } from 'react';

import './search_bar.scss';

class SearchBar extends Component {
	constructor(props) {
		super(props);

		this.state = { term: this.props.value };
	}

	onKeyPress = event => {
		if (event.key === 'Enter') {
			this.props.onSearchEnter(event.target.value);
		}
	}

	onChange = term => {
		this.setState({ term });
		this.props.onSearchChange(term);
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
					onKeyPress={this.onKeyPress}
				/>
			</div>
		);
	}
}

export default SearchBar;
