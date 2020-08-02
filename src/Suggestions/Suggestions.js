import React, { Component } from "react";

import "./Suggestions.css";

export default class Suggestions extends Component {
  render() {
    let matchingLocations = this.props.locations.filter((location) => {
      return (
        this.props.value !== "" &&
        location.name.toLowerCase().includes(this.props.value.toLowerCase())
      );
    });
    return (
      <div
        className="suggestions"
        style={{ display: matchingLocations.length > 0 ? "block" : "none" }}
      >
        <div className="contents">
          {matchingLocations.map((location, index) => (
            <div
              key={index}
              className="item"
              onClick={() => this.props.clickHandler(location.code)}
            >
              {location.code}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
