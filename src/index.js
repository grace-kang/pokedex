import './style/output.css'
import './style/styles.css'
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

var http = require("http");
setInterval(function() {
	http.get("http://<your app name>.herokuapp.com");
}, 300000); // every 5 minutes (300000)
