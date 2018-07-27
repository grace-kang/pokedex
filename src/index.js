import './style/output.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import FilterablePokedex from './containers/FilterablePokedex'
import configureStore from './redux/store/configureStore'

const store = configureStore()

render(
	<Provider store={store}>
		<FilterablePokedex/>
	</Provider>,
	document.getElementById('root')
)
