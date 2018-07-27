import React from 'react'

class Sort extends React.Component {
	render() {
		return (
			<select onChange={this.props.onChange}>
				<option value="ID" selected>Number</option>
				<option value="NAME">Name</option>
			</select>
		)
	}
}

export default Sort
