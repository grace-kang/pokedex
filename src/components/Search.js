import React from 'react'

class Search extends React.Component {
	render() {
		return (
			<div className="Search w-full bg-grey-lightest">
				<input type="text" onChange={this.props.onChange} className="shadow border rounded py-2 px-3 text-grey-darker" placeholder="Search pokemon" />
			</div>
		)
	}
}

export default Search
