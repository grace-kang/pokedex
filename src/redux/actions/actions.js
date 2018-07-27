import fetch from 'cross-fetch'

export const REQUEST_POKEMON = 'REQUEST_POKEMON'
export const RECEIVE_POKEMON  = 'RECEIVE_POKEMON'
export const FETCH_ERROR = 'FETCH_ERROR'

function requestPokemon() {
	console.log(REQUEST_POKEMON)
	return {
		type: REQUEST_POKEMON
	}
}

function receivePokemon(json) {
	console.log(RECEIVE_POKEMON)
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
	console.log(FETCH_ERROR)
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

