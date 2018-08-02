import React from 'react'
import { connect } from 'react-redux'
import Pokemon from './Pokemon'
import Modal from './Modal'
import {
	selectPokemon,
	fetchPokemonInfo
} from '../redux/actions/actions'
import { BeatLoader } from 'react-spinners'

class Pokedex extends React.Component {
	state = { showModal: false }

	handleShow = (p, e) => {
		this.props.dispatch(selectPokemon(p.id))
		this.props.dispatch(fetchPokemonInfo(p.id))
		this.setState({ showModal: true })
	}

	handleHide = (e) => {
		this.setState({ showModal: false })
	}

	render() {
		const { displayPokemon } = this.props
		const { selectedPokemon, pokemonInfo } = this.props
		var modal = null
		if (this.state.showModal) {
			if (pokemonInfo.error) {
				modal = (
					<Modal>
						<div onClick={this.handleHide} className="Modal flex w-full h-full justify-center items-center fixed pin-t pin-l">
							Error: {pokemonInfo.error}
						</div>
					</Modal>
				)
			} else if (pokemonInfo.isFetching) {
				modal = (
					<Modal>
						<div onClick={this.handleHide} className="Modal flex w-full h-full justify-center items-center fixed pin-t pin-l">
							<div className="max-w-xs border-2 border-grey bg-white rounded flex-col justify-center">
								<div className="Pokemon-spirte p-12">
									<img className="w-full" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + selectedPokemon + ".png"} alt="Pokemon sprite" />
								</div>
								<div className="px-6 py-6 mb-16 flex justify-center">
									<BeatLoader color={'#FF9DB7'} loading={true} />
								</div>
							</div>
						</div>
					</Modal>
				)
			} else {
				modal = (
					<Modal>
						<div onClick={this.handleHide} className="Modal flex w-full h-full justify-center items-center fixed pin-t pin-l">
							<div className="max-w-sm border-2 border-grey bg-white rounded flex-col justify-center">
								<div className="Pokemon-sprite">
									<img className="w-full" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + selectedPokemon + ".png"} alt="Pokemon sprite" />
								</div>
								<div className="px-6 py-6">
									<div className="text-center font-bold text-xl test-grey-darker mb-4">{pokemonInfo.info.name.charAt(0).toUpperCase() + pokemonInfo.info.name.substr(1)}</div>
									<div className="text-grey-darker text-base"><b>ID:</b> {selectedPokemon}</div>
									<div className="text-grey-darker text-base"><b>Type(s): </b>{pokemonInfo.info.types.map(t => (t + ' '))}</div>
									<div className="text-grey-darker text-base"><b>Height: </b>{pokemonInfo.info.height}</div>
									<div className="text-grey-darker text-base"><b>Weight: </b>{pokemonInfo.info.weight}</div>
								</div>
							</div>
						</div>
					</Modal>
				)
			}
		}

		return (
			<div className="Pokedex">
				<div className="Pokedex-pokemon flex flex-wrap">
					{displayPokemon.map(p => (
						<Pokemon onClick={this.handleShow.bind(this, p)} key={p.id} pokemon={p} />
					))}
				</div>
				{modal}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { selectedPokemon, pokemonInfo } = state

	return {
		selectedPokemon,
		pokemonInfo
	}
}

export default connect (
	mapStateToProps
)(Pokedex)
