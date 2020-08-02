import React, { Component } from "react";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "./Pagination.css";
export default class Pagination extends Component {
  render() {
    return (
      <div
        className="page-navigation"
        style={{
          display: this.props.total_pages > 1 ? "block" : "none",
        }}
      >
        <div className="page-changer">
          <div>
            <button
              className="page-button"
              onClick={() => this.props.decrementPageByOne()}
            >
              <FaArrowLeft />
            </button>
          </div>
          <div>
            <button
              className="page-button"
              onClick={() => this.props.incrementPageByOne()}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="page-count">
          Page {this.props.current_page} of {this.props.total_pages}
        </div>
      </div>
    );
  }
}
