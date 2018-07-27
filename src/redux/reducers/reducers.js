import { combineReducers } from 'redux'
import {
	REQUEST_POKEMON,
	RECEIVE_POKEMON,
	FETCH_ERROR,
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
	switch(action.type) {
		case FETCH_ERROR:
			return action.error
		default:
			return state
	}
}

function pokemon(state = [], action) {
	switch(action.type) {
		case RECEIVE_POKEMON:
			return action.pokemon
		case SortingOrders.ID:
			return action.pokemon
		case SortingOrders.NAME:
			return action.pokemon
		default:
			return state
	}
}

export default combineReducers({
	isFetching,
	error,
	pokemon
})

