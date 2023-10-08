import React from "react";
import "./Pokemon.css";

class Pokemon extends React.Component {
  render() {
    const { pokemon } = this.props;
    const spriteUrl =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
      pokemon.id +
      ".png";

    return (
      <div className="Pokemon" onClick={this.props.onClick}>
        <button onClick={this.handleShow}>
          <img src={spriteUrl} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </button>
      </div>
    );
  }
}

export default Pokemon;
