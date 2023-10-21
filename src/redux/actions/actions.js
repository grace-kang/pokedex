import fetch from "cross-fetch";

export const REQUEST_POKEMON = "REQUEST_POKEMON";
export const RECEIVE_POKEMON = "RECEIVE_POKEMON";
export const FETCH_ERROR = "FETCH_ERROR";
export const SELECT_POKEMON = "SELECT_POKEMON";
export const REQUEST_POKEMON_INFO = "REQUEST_POKEMON_INFO";
export const RECEIVE_POKEMON_INFO = "RECEIVE_POKEMON_INFO";
export const FETCH_INFO_ERROR = "FETCH_INFO_ERROR";
export const REQUEST_SPECIES_INFO = "REQUEST_SPECIES_INFO";
export const RECEIVE_SPECIES_INFO = "RECEIVE_SPECIES_INFO";
export const FILTER_POKEMON = "FILTER_POKEMON";
export const SortingOrders = {
  ID: "ID",
  NAME: "NAME",
};

function requestPokemon() {
  return {
    type: REQUEST_POKEMON,
  };
}

function receivePokemon(json) {
  return {
    type: RECEIVE_POKEMON,
    pokemon: json.results.map((p) => {
      p.id = p.url.substring(34, p.url.length - 1);
      p.name = p.name.charAt(0).toUpperCase() + p.name.substr(1);
      return p;
    }),
  };
}

function fetchError(error) {
  return {
    type: FETCH_ERROR,
    error: error,
  };
}

export function fetchPokemon() {
  return (dispatch) => {
    dispatch(requestPokemon());
    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=802")
      .then((response) => response.json())
      .then(
        (json) => dispatch(receivePokemon(json)),
        (error) => dispatch(fetchError(error)),
      );
  };
}

export function selectPokemon(id) {
  return {
    type: SELECT_POKEMON,
    id,
  };
}

function requestPokemonInfo(id) {
  return {
    type: REQUEST_POKEMON_INFO,
    id: id,
  };
}

function receivePokemonInfo(json) {
  return {
    type: RECEIVE_POKEMON_INFO,
    info: {
      name: json.name,
      types: json.types.map((t) => t.type.name),
      weight: json.weight,
      height: json.height,
    },
  };
}

function requestSpeciesInfo() {
  return {
    type: REQUEST_SPECIES_INFO,
  };
}

function receiveSpeciesInfo(json) {
  var english_text = "";
  for (var i in json.flavor_text_entries) {
    if (json.flavor_text_entries[i].language.name === "en") {
      english_text = json.flavor_text_entries[i].flavor_text.replace(
        /(\n|\f)/gm,
        " ",
      );
      break;
    }
  }
  var evolves_from = json.evolves_from_species
    ? json.evolves_from_species.name
    : "None";
  return {
    type: RECEIVE_SPECIES_INFO,
    species_info: {
      flavor_text: english_text,
      evolves_from: evolves_from,
      generation: json.generation.name,
    },
  };
}

function fetchInfoError(error) {
  return {
    type: FETCH_INFO_ERROR,
    error: error,
  };
}

export function fetchPokemonInfo(id) {
  return (dispatch) => {
    dispatch(requestPokemonInfo());
    return fetch("https://pokeapi.co/api/v2/pokemon/" + id + "/")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(receivePokemonInfo(json));
        dispatch(requestSpeciesInfo());
        return fetch("https://pokeapi.co/api/v2/pokemon-species/" + id + "/")
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            dispatch(receiveSpeciesInfo(json));
          })
          .catch((error) => {
            dispatch(fetchInfoError(error));
          });
      })
      .catch((error) => {
        dispatch(fetchInfoError(error));
      });
  };
}

export function filterPokemon(searchString = "") {
  return (dispatch, getState) => {
    var pokemon = getState().pokemon;
    searchString = searchString.trim().toLowerCase();
    pokemon = pokemon.filter(function (i) {
      return i.name.toLowerCase().match(searchString);
    });
    dispatch({
      type: FILTER_POKEMON,
      displayPokemon: pokemon,
    });
  };
}

export function sortByName(dispatch, getState) {
  return (dispatch, getState) => {
    var state = getState();
    var sorted = state.pokemon;
    sorted.sort(function (a, b) {
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
    dispatch({
      type: SortingOrders.NAME,
      pokemon: sorted,
    });
  };
}

export function sortByID(dispatch, getState) {
  return (dispatch, getState) => {
    var state = getState();
    var sorted = state.pokemon;
    sorted.sort(function (a, b) {
      return a.id - b.id;
    });
    dispatch({
      type: SortingOrders.ID,
      pokemon: sorted,
    });
  };
}
