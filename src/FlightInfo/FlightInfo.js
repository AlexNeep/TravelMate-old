import React, { Component } from "react";

import { FaArrowRight } from "react-icons/fa";
import "./FlightInfo.css";
export default class FlightInfo extends Component {
  render() {
    return (
      <div className="flight-info">
        <div className="route">
          <div className="location">{this.props.origin}</div>
          <div className="arrow">
            <FaArrowRight />
          </div>
          <div className="location">{this.props.destination}</div>
        </div>
        <div className="carrier">{this.props.carrier}</div>
      </div>
    );
  }
}
