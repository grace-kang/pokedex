import React from "react";
import github from "../images/github.png";
import "./Header.css";

class Header extends React.Component {
  render() {
    const githubUrl = "https://github.com/grace-kang/pokedex";

    return (
      <div className="Header">
        <a href={githubUrl}>
          <img src={github} alt="Github" />
        </a>
        <span>Pokédex</span>
      </div>
    );
  }
}

export default Header;
