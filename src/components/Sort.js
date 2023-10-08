import React from "react";
import "./Sort.css";

class Sort extends React.Component {
  render() {
    return (
      <div className="Sort">
        <label>Sort by</label>
        <select onChange={this.props.onChange}>
          <option value="ID" selected>
            Number
          </option>
          <option value="NAME">Name</option>
        </select>
      </div>
    );
  }
}

export default Sort;
