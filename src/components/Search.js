import React from 'react'

class Search extends React.Component {
	render() {
		return (
			<div className="Search w-full bg-white py-4">
				<div className="flex justify-center">
					<input type="text" onChange={this.props.onChange} className="shadow border hover:border-red-lighter rounded py-2 px-3 text-grey-darker focus:border-red-lighter" placeholder="Search pokemon" />
				</div>
			</div>
		)
	}
}

export default Search
