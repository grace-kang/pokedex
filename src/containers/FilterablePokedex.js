import React from 'react'
import Pokedex from '../components/Pokedex'
import Sort from '../components/Sort'
import Search from '../components/Search'

class FilterablePokedex extends React.Component {
	state = { searchString: '', sortBy: 'ID' }

	handleSearch = (e) => {                                        
		this.setState({ searchString: e.target.value });             
	}                                                              

	// handleSort = (e) => {                                          
	// 	console.log(e.target.value);                                 
	// 	this.setState({ needToSort: true, sortBy: e.target.value }); 
	// }                                                              

	componentDidMount() {                                                
		fetch('https://pokeapi.co/api/v2/pokemon/?limit=949')              
			.then(res => res.json())                                         
			.then(                                                           
				(json) => {                                                    
					const pokemons = json.results.map(p => {                     
						p.id = p.url.substring(34, p.url.length - 1)               
						p.name = p.name.charAt(0).toUpperCase() + p.name.substr(1) 
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
		const { error, isLoaded } = this.state;                   
		if (error) {                                                       
			return <div>Error: {error.message}</div>;                        
		} else if (!isLoaded) {                                            
			return <div>Loading...</div>                                     
		} else {                                                           

			// 	if (this.state.sortBy === "NAME") {                            
			// 		var sorted = pokemon                                         
			// 		sorted.sort(function(a,b) {                                  
			// 			var nameA = a.name.toUpperCase();                          
			// 			var nameB = b.name.toUpperCase();                          
			// 			if (nameA < nameB) {                                       
			// 				return -1;                                               
			// 			}                                                          
			// 			if (nameA > nameB) {                                       
			// 				return 1;                                                
			// 			}                                                          
			// 			return 0;                                                  
			// 		});                                                          
			// 		console.log(sorted)                                          
			// 		this.setState({ needToSort: false, pokemon: sorted })        
			// 	}                                                              
			// }                                                                

			var displayPokemon = this.state.pokemon                         
			var searchString = this.state.searchString.trim().toLowerCase();   
			if (searchString.length > 0) {                                   
				displayPokemon = displayPokemon.filter(function(i) {    
					return i.name.toLowerCase().match( searchString );    
				});                                                     
			}                                                         

			return (                                                  
				<div className="FilterablePokedex">
					<Search onChange={this.handleSearch} />
					<Pokedex displayPokemon={displayPokemon} />
				</div>
			)
		}
	}
}

export default FilterablePokedex


