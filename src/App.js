import React, { Component } from "react";
import "./App.css";

import config from "./Config/config";

import Nav from "./Navbar/Nav";
import FlightResults from "./FlightResults/FlightResults";

import DataSelectionColumn from "./DataSelectionColumn/DataSelectionColumn";
// import DataInput from "./DataInput/DataInput";
// import airport_database from "./coordinates";
// import LocationChoice from "./LocationChoice/LocationChoice";

// const countries=['UK','Germany','France', 'Greece', 'Spain', 'Portugal','Ireland']
const test_countries = ["DE-sky", "FR-sky", "BB-sky"];
// let EU_countries = [
//   "AT-sky",
//   "BE-sky",
//   "BG-sky",
//   "HR-sky",
//   "CY-sky",
//   "CZ-sky",
//   "DK-sky",
//   "EE-sky",
//   "FI-sky",
//   "FR-sky",
//   "DE-sky",
//   "GR-sky",
//   "HU-sky",
//   "IE-sky",
//   "IT-sky",
//   "LV-sky",
//   "LT-sky",
//   "LU-sky",
//   "MT-sky",
//   "NL-sky",
//   "PL-sky",
//   "PT-sky",
//   "RO-sky",
//   "SK-sky",
//   "sl-sky",
//   "es-sky",
//   "se-sky",
// ];

// let carribean_countries = [
//   "AG	-	sky",
//   "AI	-	sky",
//   "AW	-	sky",
//   "BB	-	sky",
//   "BL	-	sky",
//   "BS	-	sky",
//   "CU	-	sky",
//   "CW	-	sky",
//   "DM	-	sky",
//   "DO	-	sky",
//   "GD	-	sky",
//   "GP	-	sky",
//   "HT	-	sky",
//   "JM	-	sky",
//   "KN	-	sky",
//   "KY	-	sky",
//   "LC	-	sky",
//   "MQ	-	sky",
//   "MS	-	sky",
//   "PR	-	sky",
//   "TT	-	sky",
//   "VC	-	sky",
//   "VE	-	sky",
//   "BQ	-	sky",
//   "VG	-	sky",
//   "BQ	-	sky",
//   "MF	-	sky",
//   "BQ	-	sky",
//   "SX	-	sky",
//   "TC	-	sky",
//   "VI	-	sky",
// ];
// FOR TESTING
// EU_countries = test_countries;
// carribean_countries = [
//   "AG	-	sky",
//   "AI	-	sky",
//   "AW	-	sky",
//   "BB	-	sky",
//   "BL	-	sky",
//   "BS	-	sky",
//   "CU	-	sky",
// ];

class App extends Component {
  state = {
    baseURL: "http://127.0.0.1:9000",
    flights: [
      {
        quotes: [],
        location: [],
      },
    ],
    origin: "STN-sky",
    destination: "DE-sky",
    region: "Carribean",
    outbound: "2020-09-01",
    inbound: "2020-12-01",
    trip_duration: "7",
    currency: "GBP",
    budget: "1500",
    country: "UK",
    locale: "en-US",
  };

  getLocalAirports = (origin) => {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        return this.responseText;
      }
    });

    xhr.open(
      "GET",
      `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${origin})`
    );
    xhr.setRequestHeader(
      "x-rapidapi-host",
      "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
    );
    xhr.setRequestHeader("x-rapidapi-key", config.APIKEY);

    xhr.send(data);
  };

  updateFlights = (data) => {
    this.setState(() => ({ flights: data }));
  };
  updateOrigin = (data) => {
    this.setState(() => ({
      origin: data,
    }));
  };
  updateBudget = (data) => {
    this.setState(() => ({
      budget: data,
    }));
  };
  updateOutbound = (data) => {
    this.setState(() => ({
      outbound: data,
    }));
  };

  updateTrip_duration = (data) => {
    this.setState(() => ({
      trip_duration: data,
    }));
  };
  updateFlightTime = (data) => {
    this.setState(() => ({
      flighttime: data,
    }));
  };
  updateFlights = (quotes, locations, carriers) => {
    quotes.sort((a, b) => {
      return a.price - b.price;
    });

    this.setState(() => ({
      flights: [
        {
          quotes: quotes,
          locations: locations,
          carriers: carriers,
        },
      ],
    }));
  };

  getFlightData = async (destination) => {
    return new Promise((resolve, reject) => {
      fetch(`${this.state.baseURL}/getFlightData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            outbound_date: this.state.outbound,
            inbound_date: this.state.inbound,
            origin: this.state.origin,
            destination: destination,
            country: this.state.country,
            currency: this.state.currency,
            locale: this.state.locale,
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  browseRoutes = (destination) => {
    var json = {
      data: {
        outbound_date: this.state.outbound,
        inbound_date: this.state.inbound,
        origin: this.state.origin,
        destination: destination,
        country: this.state.country,
        currency: this.state.currency,
        locale: this.state.locale,
      },
    };

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    return new Promise((resolve, reject) => {
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          resolve(JSON.parse(this.responseText));
        }
      });

      xhr.open("POST", `${this.state.baseURL}/getFlightData`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(json));
      return this.responseText;
    });
  };

  findFlights = () => {
    console.log("sending");
    const destination = "anywhere";

    this.getFlightData(destination)
      .then((result) => this.renderFlights(result))
      .catch((error) => {
        console.log("error", error);
      });
  };

  renderFlights = (flight_data) => {
    let formated_quotes = this.formatQuotes(flight_data.Quotes);
    let formated_locations = this.formatLocations(flight_data.Places);
    let formated_carriers = this.formatCarriers(flight_data.Carriers);
    this.updateFlights(formated_quotes, formated_locations, formated_carriers);
  };

  formatQuotes = (data) => {
    let formated_quotes = [];
    for (let i = 0; i < data.length; i++) {
      let current_quote = data[i];

      let temp = [];

      let QuoteId = current_quote.QuoteId;
      let origin = current_quote.OutboundLeg.OriginId;
      let destination = current_quote.OutboundLeg.DestinationId;

      let carrierId = current_quote.OutboundLeg.CarrierIds[0];
      let price = current_quote.MinPrice;

      temp["id"] = QuoteId;
      temp["origin"] = origin;
      temp["destination"] = destination;
      temp["carrier"] = carrierId;
      temp["price"] = price;

      formated_quotes.push(temp);
    }
    console.log(formated_quotes);
    return formated_quotes;
  };
  formatLocations = (data) => {
    let formated_locations = [];

    for (let i = 0; i < data.length; i++) {
      let current_location = data[i];

      let temp = [];

      let placeId = current_location.PlaceId;
      let name = current_location.CityName;
      let country = current_location.CountryName;

      temp["id"] = placeId;
      temp["name"] = name;
      temp["country"] = country;
      formated_locations.push(temp);
    }
    return formated_locations;
  };
  formatCarriers = (data) => {
    let formated_carriers = [];

    for (let i = 0; i < data.length; i++) {
      let current_carrier = data[i];

      let temp = [];

      let carrier_id = current_carrier.CarrierId;
      let carrier_name = current_carrier.Name;

      temp["id"] = carrier_id;
      temp["name"] = carrier_name;
      formated_carriers.push(temp);
    }
    return formated_carriers;
  };
  calcMaxDistance = (flight_time) => {
    const FLIGHT_SPEED_KM = 800;
    return flight_time * FLIGHT_SPEED_KM;
  };
  distanceBetweenPoints = () => {
    // let R = (type == DistanceType.Miles) ? 3960 : 6371;
    // let dLat = this.toRadian(pos2.Latitude – pos1.Latitude);
    // let dLon = this.toRadian(pos2.Longitude – pos1.Longitude);
    // let a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
    //     Math.Cos(this.toRadian(pos1.Latitude)) *Math.Cos(this.toRadian(pos2.Latitude)) *
    //     Math.Sin(dLon / 2) * Math.Sin(dLon / 2);
    // let c = 2 * Math.Asin(Math.Min(1, Math.Sqrt(a)));
    // let d = R * c;
    // return d;
  };

  render() {
    return (
      <div className="app">
        <Nav />

        <div className="row">
          <DataSelectionColumn
            origin={this.state.origin}
            outbound={this.state.outbound}
            trip_duration={this.state.trip_duration}
            budget={this.state.budget}
            updateOrigin={this.updateOrigin}
            updateOutbound={this.updateOutbound}
            updateTrip_duration={this.updateTrip_duration}
            updateBudget={this.updateBudget}
            findFlights={this.findFlights}
          />
          <div className="results-col">
            <FlightResults
              flightData={this.state.flights[0]}
              currency={this.state.currency}
              budget={this.state.budget}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
