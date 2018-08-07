import { combineReducers } from 'redux'
import {
	REQUEST_POKEMON,
	RECEIVE_POKEMON,
	FETCH_ERROR,
	SELECT_POKEMON,
	REQUEST_POKEMON_INFO,
	RECEIVE_POKEMON_INFO,
	FETCH_INFO_ERROR,
	REQUEST_SPECIES_INFO,
	RECEIVE_SPECIES_INFO,
	FILTER_POKEMON,
	SortingOrders
} from '../actions/actions'


function isFetching(state = false, action) {
	switch (action.type) {
		case REQUEST_POKEMON:
			return true
		case RECEIVE_POKEMON:
			return false
		case FETCH_ERROR:
			return false
		default:
			return state
	}
}

function error(state = null, action) {
	switch (action.type) {
		case FETCH_ERROR:
			return action.error
		default:
			return state
	}
}

function pokemon(state = [], action) {
	switch (action.type) {
		case RECEIVE_POKEMON:
			return action.pokemon
		default:
			return state
	}
}

function displayPokemon(state = [], action) {
	switch (action.type) {
		case RECEIVE_POKEMON:
			return action.pokemon
		case FILTER_POKEMON:
			return action.displayPokemon
		case SortingOrders.ID:
			return action.displayPokemon
		case SortingOrders.NAME:
			return action.displayPokemon
		default:
			return state
	}
}

function selectedPokemon(state = null, action) {
	switch (action.type) {
		case SELECT_POKEMON:
			return action.id
		default:
			return state
	}
}

function pokemonInfo(
	state = {
		isFetching: false,
		error: null,
		info: {}
	},
	action
) {
	switch (action.type) {
		case REQUEST_POKEMON_INFO:
			return Object.assign({}, state, {
				isFetching: true,
				error: null
			})
		case RECEIVE_POKEMON_INFO:
			return Object.assign({}, state, {
				info: action.info
			})
		case REQUEST_SPECIES_INFO:
			return Object.assign({}, state, {
				isFetching: true,
				error: null
			})
		case RECEIVE_SPECIES_INFO:
			return Object.assign({}, state, {
				isFetching: false,
				species_info: action.species_info
			})
		case FETCH_INFO_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				error: action.error
			})
		default:
			return state
	}
}

export default combineReducers({
	isFetching,
	error,
	pokemon,
	displayPokemon,
	selectedPokemon,
	pokemonInfo
})

