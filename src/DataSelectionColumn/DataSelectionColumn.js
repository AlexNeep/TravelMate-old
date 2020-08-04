import React, { Component } from "react";

import DataInput from "../DataInput/DataInput";
import LocationChoice from "../LocationChoice/LocationChoice";

export default class DataSelectionColumn extends Component {
  render() {
    return (
      <div className="selection-col">
        <LocationChoice
          title="Origin"
          clickHandler={this.props.updateOrigin}
          value={this.props.origin}
        />
        <DataInput
          title="Outbound Date"
          clickHandler={this.props.updateOutbound}
          value={this.props.outbound}
        />
        <DataInput
          title="Length"
          clickHandler={this.props.updateTrip_duration}
          value={this.props.trip_duration}
        />

        <div className="selection-item">
          <div className="title">Budget</div>
          <input
            type="range"
            min="10"
            max="1000"
            value={this.props.budget}
            className="budget-slider"
            onChange={(event) => this.props.updateBudget(event.target.value)}
          />
          <div>
            <input
              className="budget-input"
              value={this.props.budget}
              onChange={(event) => this.props.updateBudget(event.target.value)}
            />
          </div>
        </div>

        <div className="selection-item">
          <button
            className="selection-button"
            onClick={() => this.props.findFlights()}
          >
            Find Flights
          </button>
        </div>
      </div>
    );
  }
}
