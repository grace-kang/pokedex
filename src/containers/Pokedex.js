import React from "react";
import { connect } from "react-redux";
import Pokemon from "../components/Pokemon";
import Modal from "../components/Modal";
import Search from "../components/Search";
import Sort from "../components/Sort";
import {
  selectPokemon,
  fetchPokemonInfo,
  filterPokemon,
  sortByID,
  sortByName,
} from "../redux/actions/actions";
import { BeatLoader } from "react-spinners";
import "./Pokedex.css";

class Pokedex extends React.Component {
  state = { showModal: false, sortHappened: false };

  handleShow = (p, e) => {
    this.props.dispatch(selectPokemon(p.id));
    this.props.dispatch(fetchPokemonInfo(p.id));
    this.setState({ showModal: true });
  };

  handleSort = (e) => {
    if (e.target.value === "ID") {
      this.props.dispatch(sortByID());
    } else if (e.target.value === "NAME") {
      this.props.dispatch(sortByName());
    }
    this.setState({ sortHappened: true });
  };

  handleHide = (e) => {
    this.setState({ showModal: false });
  };

  handleSearch = (e) => {
    this.props.dispatch(filterPokemon(e.target.value));
  };

  render() {
    let { displayPokemon, selectedPokemon, pokemonInfo } = this.props;

    if (this.state.sortHappened) {
      displayPokemon = this.props.displayPokemon;
      this.setState({ sortHappened: false });
    }

    return (
      <div>
        <Search onChange={this.handleSearch} />
        <Sort onChange={this.handleSort} />
        <div className="Pokedex">
          {displayPokemon.map((p) => (
            <Pokemon
              onClick={this.handleShow.bind(this, p)}
              key={p.id}
              pokemon={p}
            />
          ))}
        </div>
        {this.state.showModal && (
          <Modal>
            <div onClick={this.handleHide} className="Modal">
              <div id="card">
                <img
                  src={
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                    selectedPokemon +
                    ".png"
                  }
                  alt="Pokemon sprite"
                />
                {pokemonInfo.isFetching ? (
                  <BeatLoader color={"#FF9DB7"} loading={true} />
                ) : (
                  <div className="PokemonText">
                    <div className="PokemonName">{pokemonInfo.info.name}</div>
                    <div className="PokemonDescription">
                      {pokemonInfo.species_info.flavor_text}
                    </div>
                    <div className="PokemonStats">
                      <p>ID: {selectedPokemon}</p>
                      <p>
                        Type(s): {pokemonInfo.info.types.map((t) => t + " ")}
                      </p>
                      <p>Height: {pokemonInfo.info.height}</p>
                      <p>Weight: {pokemonInfo.info.weight}</p>
                      <p>Generation: {pokemonInfo.species_info.generation}</p>
                      <p>
                        Evolves From: {pokemonInfo.species_info.evolves_from}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { displayPokemon, selectedPokemon, pokemonInfo } = state;

  return {
    displayPokemon,
    selectedPokemon,
    pokemonInfo,
  };
}

export default connect(mapStateToProps)(Pokedex);
