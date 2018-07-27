import React from 'react'
import { connect } from 'react-redux'
import Pokedex from '../components/Pokedex'
import Sort from '../components/Sort'
import Search from '../components/Search'
import {
	fetchPokemon,
	sortByID,
	sortByName
} from '../redux/actions/actions'

class FilterablePokedex extends React.Component {
	state = { searchString: '', sortHappened: false }
	handleSearch = (e) => {                                        
		this.setState({ searchString: e.target.value });             
	}                                                              

	handleSort = (e) => {                                          
		this.setState({ sortHappened: true })
		if (e.target.value === 'ID') {
			this.props.dispatch(sortByID())
		} else if (e.target.value === 'NAME') {
			this.props.dispatch(sortByName())
		}
	}                                                              

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

			var displayPokemon = this.props.pokemon
			var searchString = this.state.searchString.trim().toLowerCase();   
			if (searchString.length > 0) {                                   
				displayPokemon = displayPokemon.filter(function(i) {    
					return i.name.toLowerCase().match( searchString );    
				});                                                     
			}                                                         
			
			if (this.state.sortHappened) {
				displayPokemon = this.props.pokemon
				this.setState({ sortHappened: false })
			}

			return (                                                  
				<div className="FilterablePokedex">
					<Search onChange={this.handleSearch} />
					<Sort onChange={this.handleSort} />
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


