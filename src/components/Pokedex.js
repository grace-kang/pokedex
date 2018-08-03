import React from 'react'
import { connect } from 'react-redux'
import Pokemon from './Pokemon'
import Modal from './Modal' 
import Search from './Search'
import Sort from './Sort'
import {
	selectPokemon,
	fetchPokemonInfo,
	filterPokemon,
	sortByID,
	sortByName
} from '../redux/actions/actions'
import { BeatLoader } from 'react-spinners'

class Pokedex extends React.Component {
	state = { showModal: false, sortHappened: false }

	handleShow = (p, e) => {
		this.props.dispatch(selectPokemon(p.id))
		this.props.dispatch(fetchPokemonInfo(p.id))
		this.setState({ showModal: true })
	}

	handleSort = (e) => {
		if (e.target.value === 'ID') {
			this.props.dispatch(sortByID())
		} else if (e.target.value === 'NAME') {
			this.props.dispatch(sortByName())
		}
		this.setState({ sortHappened: true })
	}

	handleHide = (e) => {
		this.setState({ showModal: false })
	}

	handleSearch = (e) => {
		this.props.dispatch(filterPokemon(e.target.value))
	}

	render() {
		let { displayPokemon, selectedPokemon, pokemonInfo } = this.props
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
							<div className="max-w-xs w-64 border-2 shadow border-grey bg-white rounded flex-col justify-center">
								<div className="Pokemon-spirte p-6">
									<img className="w-full" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + selectedPokemon + ".png"} alt="Pokemon sprite" />
								</div>
								<div className="px-6 my-12 mb-16 flex justify-center">
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
							<div className="max-w-sm w-64 border-2 border-grey bg-white rounded flex-col justify-center">
								<div className="Pokemon-sprite p-6">
									<img className="w-full" src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + selectedPokemon + ".png"} alt="Pokemon sprite" />
								</div>
								<div className="px-6 pb-6">
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

		if (this.state.sortHappened) {
			displayPokemon = this.props.displayPokemon
			this.setState({ sortHappened: false })
		}

		let pokemon = displayPokemon.map(p => (
			<Pokemon onClick={this.handleShow.bind(this, p)} key={p.id} pokemon={p} />
		))

		return (
			<div className="Pokedex">
				<Search onChange={this.handleSearch} />
				<Sort onChange={this.handleSort} />
				<div className="Pokedex-pokemon pt-4 flex flex-wrap">{pokemon}</div>
				{modal}
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { displayPokemon, selectedPokemon, pokemonInfo } = state

	return {
		displayPokemon,
		selectedPokemon,
		pokemonInfo
	}
}

export default connect (
	mapStateToProps
)(Pokedex)
