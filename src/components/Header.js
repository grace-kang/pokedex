import React from 'react'
import github from '../images/github.png'

class Header extends React.Component {
	render() {
		return (
			<div className="Header">
				<div className="w-full py-10 bg-red-lighter">
					<a href="https://github.com/grace-kang/pokedex"><img className="absolute pin-r pin-t m-2" src={github} alt="Github" /></a>
					<div className="flex justify-center items-center">
						<h1 className="font-black font-sans uppercase text-5xl text-white">Pokédex</h1>
					</div>
				</div>
			</div>
		)
	}
}

export default Header
