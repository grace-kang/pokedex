import React from 'react'
import { connect } from 'react-redux'
import Pokedex from '../components/Pokedex'
import {
	fetchPokemon,
	sortByID,
	sortByName
} from '../redux/actions/actions'

class FilterablePokedex extends React.Component {
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
			return (                                                  
				<div className="FilterablePokedex">
					<Pokedex />
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


