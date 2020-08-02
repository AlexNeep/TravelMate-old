import React, { Component } from "react";

import uniqueId from "../Functions/newids";
import Suggestions from "../Suggestions/Suggestions";

import "./LocationChoice.css";
export default class LocationChoice extends Component {
  state = {
    locations: [
      {
        name: "London Stansted",
        code: "STN-sky",
      },
      {
        name: "London Heathrow",
        code: "LHR-sky",
      },
      {
        name: "London Gatwick",
        code: "LGW-sky",
      },
      {
        name: "London Luton",
        code: "LTN-sky",
      },
      {
        name: "London City",
        code: "LCY-sky",
      },
      {
        name: "London Southend",
        code: "SEN-sky",
      },
    ],
  };

  render() {
    return (
      <div className="selection-item">
        <div className="title">{this.props.title}</div>
        <input
          type="text"
          onChange={(event) => this.props.clickHandler(event.target.value)}
          value={this.props.value}
        />
        <Suggestions
          locations={this.state.locations}
          clickHandler={this.props.clickHandler}
          value={this.props.value}
        />
      </div>
    );
  }
}
