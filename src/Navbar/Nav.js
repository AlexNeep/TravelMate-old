import React, { Component } from "react";

import "./Navbar.css";

export default class Nav extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="logo">Logo</div>
        <div className="nav-links">
          <div className="nav-link">Link 1</div>
          <div className="nav-link">Link 2</div>
          <button className="nav-button">Log In</button>
        </div>
      </div>
    );
  }
}
