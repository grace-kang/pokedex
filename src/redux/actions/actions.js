import fetch from 'cross-fetch'

export const REQUEST_POKEMON = 'REQUEST_POKEMON'
export const RECEIVE_POKEMON  = 'RECEIVE_POKEMON'
export const FETCH_ERROR = 'FETCH_ERROR'
export const SELECT_POKEMON = 'SELECT_POKEMON'
export const REQUEST_POKEMON_INFO = 'REQUEST_POKEMON_INFO'
export const RECEIVE_POKEMON_INFO = 'RECEIVE_POKEMON_INFO'
export const SortingOrders = {
	ID: 'ID',
	NAME: 'NAME'
}

function requestPokemon() {
	return {
		type: REQUEST_POKEMON
	}
}

function receivePokemon(json) {
	return {
		type: RECEIVE_POKEMON,
		pokemon: json.results.map(p => {
			p.id = p.url.substring(34, p.url.length - 1)
			p.name = p.name.charAt(0).toUpperCase() + p.name.substr(1)
			return p
		})
	}
}

function fetchError(error) {
	return {
		type: FETCH_ERROR,
		error: error
	}
}

export function fetchPokemon() {
	return dispatch => {
		dispatch(requestPokemon())
		return fetch('https://pokeapi.co/api/v2/pokemon/?limit=949')
			.then(response => response.json())
			.then(
				(json) => dispatch(receivePokemon(json)),
				(error) => dispatch(fetchError(error))
			)
	}
}

export function selectPokemon(id) {
	return {
		type: SELECT_POKEMON,
		id
	}
}

function requestPokemonInfo(id) {
	return {
		type: REQUEST_POKEMON_INFO,
		id: id
	}
}

function receivePokemonInfo(json) {
	return {
		type: RECEIVE_POKEMON_INFO,
		info: {
			name: json.name,
			types: json.types.map(t => t.type.name),
			weight: json.weight,
			height: json.height
		}
	}
}

export function fetchPokemonInfo(id) {
	return dispatch => {
		dispatch(requestPokemonInfo())
		return fetch('https://pokeapi.co/api/v2/pokemon/' + id + '/')
			.then(response => response.json())
			.then(
				(json) => dispatch(receivePokemonInfo(json)),
				(error) => dispatch(fetchError(error))
			)
	}
}

export function sortByName(dispatch, getState) {
	return (dispatch, getState) => {
		var state = getState()
		var sorted = state.pokemon                                  
		sorted.sort(function(a,b) {                           
			var nameA = a.name.toUpperCase();                   
			var nameB = b.name.toUpperCase();                   
			if (nameA < nameB) {                                
				return -1;                                        
			}                                                   
			if (nameA > nameB) {                                
				return 1;                                         
			}                                                   
			return 0;                                           
		});                                                   
		return {
			type: SortingOrders.NAME,
			pokemon: sorted
		}
	}
}

export function sortByID(dispatch, getState) {
	return (dispatch, getState) => {
		var state = getState()
		var sorted = state.pokemon
		sorted.sort(function (a,b) {
			return a.id - b.id;
		})
		return {
			type: SortingOrders.ID,
			pokemon: sorted
		}
	}
}

