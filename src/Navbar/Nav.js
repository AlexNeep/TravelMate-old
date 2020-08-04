import React, { Component } from "react";

import loading_img from "../images/TravelMate.svg";
import "./Navbar.css";

export default class Nav extends Component {
  render() {
    return (
      <div className="navbar">
        {/* <div className="logo"> */}
        <img className="logo" src={loading_img} />
        {/* </div> */}
        <div className="nav-links">
          <div className="nav-link">Link 1</div>
          <div className="nav-link">Link 2</div>
          <button className="nav-button">Button</button>
        </div>
      </div>
    );
  }
}
