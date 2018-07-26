import React from 'react'

class Search extends React.Component {
	render() {
		return (
			<input type="text" onChange={this.props.onChange} placeholder="Search pokemon" />
		)
	}
}

export default Search
