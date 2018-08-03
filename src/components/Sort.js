import React from 'react'

class Sort extends React.Component {
	render() {
		return (
			<div className="Sort w-full p-2 bg-grey-lightest">
				<div className="flex justify-center">
					<div className="flex-col">
						<label className="text-grey-darker font-bold text-xs mr-2">SORT BY</label>
						<select onChange={this.props.onChange} className="border text-sm uppercase focus:border-red-lighter shadow bg-white text-grey-darker py-2 px-3 rounded">
							<option value="ID" selected>Number</option>
							<option value="NAME">Name</option>
						</select>
					</div>
				</div>
			</div>
		)
	}
}

export default Sort
