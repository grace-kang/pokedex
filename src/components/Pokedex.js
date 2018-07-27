import React from 'react'
import Pokemon from './Pokemon'

class Pokedex extends React.Component {
	render() {
		const { displayPokemon } = this.props
		return (
			<div className="Pokedex">
				<div className="Pokedex-pokemon flex flex-wrap">
					{displayPokemon.map(p => (
						<Pokemon key={p.id} pokemon={p} />
					))}
				</div>
			</div>
		);
	}
}

export default Pokedex
