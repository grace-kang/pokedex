import React from 'react'

class Pokemon extends React.Component {
	render() {
		const { pokemon } = this.props
		return (
			<div className="Pokemon bg-white ml-2 mt-2" onClick={this.props.onClick}>
				<button className="Pokemon focus:border-red-lighter border shadow p-2" onClick={this.handleShow}>
					<img className="Pokemon-sprite"
						src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"}
						onError={(e)=>{e.target.src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"}}
						alt="Pokemon sprite"
					/>
					<p className="Pokemon-name text-xs text-grey-darkest uppercase">
						{pokemon.name}
					</p>
				</button>
			</div>
		)
	}
}

export default Pokemon
