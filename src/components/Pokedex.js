import React from 'react'
import fetch from 'cross-fetch'
import Pokemon from './Pokemon'
import Search from './Search'

class Pokedex extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		isLoaded: false,
	// 		error: null,
	// 		pokemon: []
	// 	};
	// }
	state = { searchString: '' }
	handleChange = (e) => {
		this.setState({ searchString: e.target.value });
	}

	componentDidMount() {
		fetch('https://pokeapi.co/api/v2/pokemon/?limit=949')
			.then(res => res.json())
			.then(
				(json) => {
					const pokemons = json.results.map(p => {
						p.id = p.url.substring(34, p.url.length - 1)
						p.name = p.name
						return p
					})
					this.setState({
						isLoaded: true,
						pokemon: pokemons
					})
				},

				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	render() {
		const { error, isLoaded, pokemon } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>
		} else {
			var displayPokemon = pokemon,
				searchString = this.state.searchString.trim().toLowerCase();
			if (searchString.length > 0) {
				displayPokemon = displayPokemon.filter(function(i) {
					return i.name.toLowerCase().match( searchString );
				});
			}
			return (
				<div className="Pokedex">
					<div className="Pokedex-search">
						<Search onChange={this.handleChange} />
					</div>
					<div className="Pokedex-pokemon flex flex-wrap">
						{displayPokemon.map(p => (
							<Pokemon pokemon={p} />
						))}
					</div>
				</div>
			);
		}
	}
}

export default Pokedex
