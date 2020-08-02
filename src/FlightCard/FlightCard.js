import React, { Component } from "react";

import FlightInfo from "../FlightInfo/FlightInfo";

import "./FlightCard.css";

class FlightCard extends Component {
  render() {
    return (
      <div key={this.props.id} className="flight-card">
        <FlightInfo
          origin={this.props.origin}
          destination={this.props.destination}
          carrier={this.props.carrier}
        />

        <div className="price">
          {this.props.currency} {this.props.price}
        </div>
      </div>
    );
  }
}
export default FlightCard;
