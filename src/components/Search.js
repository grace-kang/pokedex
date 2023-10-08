import React from "react";

class Search extends React.Component {
  render() {
    return (
      <div className="Search">
        <input
          type="text"
          onChange={this.props.onChange}
          placeholder="Search Pokémon"
        />
      </div>
    );
  }
}

export default Search;
