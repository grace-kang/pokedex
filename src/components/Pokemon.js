import React from 'react'

class Pokemon extends React.Component {
	render() {
		const { pokemon } = this.props

		return (
			<button className="Pokemon border" onClick={this.props.onClick}>
				<img className="Pokemon-sprite"
					src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"}
					onError={(e)=>{e.target.src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"}}
					alt="Pokemon sprite"
				/>
				<p className="Pokemon-name">
					{pokemon.name}
				</p>
			</button>
		)
	}
}

export default Pokemon
