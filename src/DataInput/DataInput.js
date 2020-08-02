import React, { Component } from "react";

import "./DataInput.css";
class DataInput extends Component {
  render() {
    return (
      <div className="selection-item">
        <div className="title">{this.props.title}</div>
        <input
          type="text"
          onChange={(event) => this.props.clickHandler(event.target.value)}
          value={this.props.value}
        />
      </div>
    );
  }
}
export default DataInput;
