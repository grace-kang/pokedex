import React from 'react'
import { connect } from 'react-redux'
import Pokedex from '../components/Pokedex'
// import Sort from '../components/Sort'
import Search from '../components/Search'
import {
	fetchPokemon
} from '../redux/actions/actions'

class FilterablePokedex extends React.Component {
	state = { searchString: '' }
	handleSearch = (e) => {                                        
		this.setState({ searchString: e.target.value });             
	}                                                              
	//
	// handleSort = (e) => {                                          
	// 	console.log(e.target.value);                                 
	// 	this.setState({ needToSort: true, sortBy: e.target.value }); 
	// }                                                              

	componentDidMount() {                                                
		this.props.dispatch(fetchPokemon())
	}                                                                    

	render() {                                                           
		const { error, isFetching } = this.props;                   
		if (error) {                                                       
			return <div>Error: {error.message}</div>;                        
		} else if (isFetching) {                                            
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
			console.log(this.props)
			var displayPokemon = this.props.pokemon
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

function mapStateToProps(state) {                           
	const { isFetching, error, pokemon } =  state

	return {                                                  
		isFetching,                                             
		error,                                                  
		pokemon
	}                                                         
}                                                           

export default connect(                                     
	mapStateToProps                                          
)(FilterablePokedex)                                        


