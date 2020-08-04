import React, { Component } from "react";

import FlightCard from "../FlightCard/FlightCard";
import Pagination from "../Pagination/Pagination";

import loading_img from "../images/TravelMate.svg";

import "./FlightResults.css";
class FlightResults extends Component {
  state = {
    perPage: 5,
    current_page: 1,
    total_pages: 0,
  };

  decodeJsonId = (needle_id, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].id === needle_id) {
        return array[i].name;
      }
    }
    return "unknown";
  };

  decodeCurrency = (currency) => {
    if (currency === "GBP") {
      return "£";
    } else {
      return "unknown";
    }
  };

  incrementPageByOne = () => {
    if (this.state.current_page < this.state.total_pages) {
      let new_page_value = this.state.current_page + 1;
      this.setState(() => ({
        current_page: new_page_value,
      }));
    }
  };
  decrementPageByOne = () => {
    if (this.state.current_page > 1) {
      let new_page_value = this.state.current_page - 1;
      this.setState(() => ({
        current_page: new_page_value,
      }));
    }
  };
  setTotalPages = (value = this.getTotalPages()) => {
    this.setState(() => ({
      total_pages: value,
    }));
  };

  getTotalPages = () => {
    return Math.ceil(
      this.getWithinBudgetFlights(this.props.flightData.quotes).length /
        this.state.perPage
    );
  };

  setCurrentPage = (total_pages) => {
    if (total_pages > 0) {
      if (this.state.current_page > total_pages) {
        this.setState(() => ({
          current_page: total_pages,
        }));
      }
    }
  };
  getVisibleFlights = (flight_data, PER_PAGE) => {
    let all_flights = flight_data.quotes;

    let lower_bound = 0 + PER_PAGE * (this.state.current_page - 1);
    let upper_bound = PER_PAGE * this.state.current_page;

    let within_budget_flights = this.getWithinBudgetFlights(all_flights);
    return within_budget_flights.slice(lower_bound, upper_bound);
  };

  getWithinBudgetFlights = (all_flights, budget = this.props.budget) => {
    return all_flights.filter((flight) => flight.price < budget);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.budget !== this.props.budget) {
      this.setTotalPages();
      this.setCurrentPage();
    }
    if (
      this.getWithinBudgetFlights(prevProps.flightData.quotes, prevProps.budget)
        .length !==
      this.getWithinBudgetFlights(this.props.flightData.quotes).length
    ) {
      let total_pages = this.getTotalPages();
      this.setTotalPages(total_pages);
      this.setCurrentPage(total_pages);
    }
  };

  render() {
    let visible_flights = this.getVisibleFlights(
      this.props.flightData,
      this.state.perPage
    );

    if (visible_flights.length === 0) {
      return (
        <div>
          <img className="loading-img" src={loading_img} />
          <h3 className="dark"> Find your next (affordable) holiday</h3>
        </div>
      );
    } else {
      return (
        <div className="flight-results">
          {visible_flights.map((flight, index) => (
            <FlightCard
              key={index}
              origin={this.decodeJsonId(
                flight.origin,
                this.props.flightData.locations
              )}
              destination={this.decodeJsonId(
                flight.destination,
                this.props.flightData.locations
              )}
              carrier={this.decodeJsonId(
                flight.carrier,
                this.props.flightData.carriers
              )}
              price={flight.price}
              currency={this.decodeCurrency(this.props.currency)}
            />
          ))}
          <Pagination
            decrementPageByOne={this.decrementPageByOne}
            incrementPageByOne={this.incrementPageByOne}
            current_page={this.state.current_page}
            total_pages={this.state.total_pages}
          />
        </div>
      );
    }
  }
}
export default FlightResults;
