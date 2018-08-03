import React from 'react'
import { connect } from 'react-redux'
import Pokedex from '../components/Pokedex'
import Header from '../components/Header'
import {
	fetchPokemon
} from '../redux/actions/actions'
import { BeatLoader } from 'react-spinners'

class FilterablePokedex extends React.Component {
	componentDidMount() {                                                
		this.props.dispatch(fetchPokemon())
	}                                                                    

	render() {                                                           
		const { error, isFetching } = this.props;                   
		if (error) {                                                       
			return <div>Error: {error.message}</div>;                        
		} else if (isFetching) {                                            
			return (
				<div className="Loading w-screen h-screen flex items-center justify-center">
					<BeatLoader color={'#FF9DB7'} loading={true} />
				</div>
			)
		} else {                                                           
			return (                                                  
				<div className="FilterablePokedex">
					<Header />
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


