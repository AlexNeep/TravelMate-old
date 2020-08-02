import React, { Component } from "react";
import "./App.css";

import config from "./Config/config";

import Nav from "./Navbar/Nav";
import FlightResults from "./FlightResults/FlightResults";
import DataInput from "./DataInput/DataInput";
import airport_database from "./coordinates";
import LocationChoice from "./LocationChoice/LocationChoice";

// const countries=['UK','Germany','France', 'Greece', 'Spain', 'Portugal','Ireland']
const test_countries = ["DE-sky", "FR-sky", "BB-sky"];
let EU_countries = [
  "AT-sky",
  "BE-sky",
  "BG-sky",
  "HR-sky",
  "CY-sky",
  "CZ-sky",
  "DK-sky",
  "EE-sky",
  "FI-sky",
  "FR-sky",
  "DE-sky",
  "GR-sky",
  "HU-sky",
  "IE-sky",
  "IT-sky",
  "LV-sky",
  "LT-sky",
  "LU-sky",
  "MT-sky",
  "NL-sky",
  "PL-sky",
  "PT-sky",
  "RO-sky",
  "SK-sky",
  "sl-sky",
  "es-sky",
  "se-sky",
];

let carribean_countries = [
  "AG	-	sky",
  "AI	-	sky",
  "AW	-	sky",
  "BB	-	sky",
  "BL	-	sky",
  "BS	-	sky",
  "CU	-	sky",
  "CW	-	sky",
  "DM	-	sky",
  "DO	-	sky",
  "GD	-	sky",
  "GP	-	sky",
  "HT	-	sky",
  "JM	-	sky",
  "KN	-	sky",
  "KY	-	sky",
  "LC	-	sky",
  "MQ	-	sky",
  "MS	-	sky",
  "PR	-	sky",
  "TT	-	sky",
  "VC	-	sky",
  "VE	-	sky",
  "BQ	-	sky",
  "VG	-	sky",
  "BQ	-	sky",
  "MF	-	sky",
  "BQ	-	sky",
  "SX	-	sky",
  "TC	-	sky",
  "VI	-	sky",
];
// FOR TESTING
EU_countries = test_countries;
carribean_countries = [
  "AG	-	sky",
  "AI	-	sky",
  "AW	-	sky",
  "BB	-	sky",
  "BL	-	sky",
  "BS	-	sky",
  "CU	-	sky",
];

class App extends Component {
  state = {
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
    budget: "500",
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

  browseRoutes = (destination) => {
    const outbound_date = this.state.outbound;
    const inbound_date = this.state.inbound;
    const origin = this.state.origin;
    // const destination=this.state.destination
    const country = "UK";
    const currency = this.state.currency;
    const locale = "en-US";

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    return new Promise((resolve, reject) => {
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          resolve(JSON.parse(this.responseText));
        }
      });
      xhr.open(
        "GET",
        `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/${country}/${currency}/${locale}/${origin}/${destination}/${outbound_date}?inboundpartialdate=${inbound_date}`
      );
      xhr.setRequestHeader(
        "x-rapidapi-host",
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
      );
      xhr.setRequestHeader("x-rapidapi-key", config.APIKEY);

      xhr.send(data);
      return this.responseText;
    });
  };
  getTargetRegionList = () => {
    if (this.state.region === "EU") {
      return EU_countries;
    } else if (this.state.region === "Carribean") {
      return carribean_countries;
    } else {
      return test_countries;
    }
  };
  findFlights = () => {
    let airport_list = [];
    let promises = [];

    // let target_region_list=this.getTargetRegionList()
    // for(let i=0;i<target_region_list.length;i++){
    //  promises.push(this.browseRoutes(target_region_list[i]).then((result) => airport_list.push(result)))
    // }

    promises.push(
      this.browseRoutes("anywhere").then((result) => airport_list.push(result))
    );

    Promise.all(promises).then(() => this.renderFlights(airport_list));
  };

  renderFlights = (airport_list) => {
    console.log("data", airport_list);

    let formated_quotes = this.formatQuotes(airport_list);
    let formated_locations = this.formatLocations(airport_list);
    let formated_carriers = this.formatCarriers(airport_list);
    this.updateFlights(formated_quotes, formated_locations, formated_carriers);
  };
  formatLocations = (data) => {
    let formated_locations = [];

    for (let i = 0; i < data.length; i++) {
      let current_country = data[i];

      for (let j = 0; j < current_country.Places.length; j++) {
        let current_location = current_country.Places[j];
        let temp = [];

        let placeId = current_location.PlaceId;
        let name = current_location.CityName;
        let country = current_location.CountryName;

        temp["id"] = placeId;
        temp["name"] = name;
        temp["country"] = country;
        formated_locations.push(temp);
      }
    }
    return formated_locations;
  };
  formatQuotes = (data) => {
    let formated_quotes = [];

    for (let i = 0; i < data.length; i++) {
      let current_country = data[i];

      for (let j = 0; j < current_country.Quotes.length; j++) {
        let current_quote = current_country.Quotes[j];
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
    }
    return formated_quotes;
  };
  formatCarriers = (data) => {
    let formated_carriers = [];

    for (let i = 0; i < data.length; i++) {
      let current_country = data[i];

      for (let j = 0; j < current_country.Carriers.length; j++) {
        let current_carriers = current_country.Carriers[j];
        let temp = [];

        let carrier_id = current_carriers.CarrierId;
        let carrier_name = current_carriers.Name;

        temp["id"] = carrier_id;
        temp["name"] = carrier_name;
        formated_carriers.push(temp);
      }
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
          <div className="selection-col">
            {/* <DataInput
              title="Origin"
              clickHandler={this.updateOrigin}
              value={this.state.origin}
            /> */}
            <LocationChoice
              title="Origin"
              clickHandler={this.updateOrigin}
              value={this.state.origin}
            />
            {/* <DataInput
              title='Target Desintation'
              clickHandler={this.updateRegion}
              value={this.state.region}
            /> */}

            <DataInput
              title="Outbound Date"
              clickHandler={this.updateOutbound}
              value={this.state.outbound}
            />
            <DataInput
              title="Length"
              clickHandler={this.updateTrip_duration}
              value={this.state.trip_duration}
            />

            <div className="selection-item">
              <h4>{this.props.title}</h4>
              <input
                type="range"
                min="10"
                max="1000"
                value={this.state.budget}
                className="budget-slider"
                onChange={(event) => this.updateBudget(event.target.value)}
              />
              <div>
                <input
                  className="budget-input"
                  value={this.state.budget}
                  onChange={(event) => this.updateBudget(event.target.value)}
                />
              </div>
            </div>

            <div className="selection-item">
              <button
                className="selection-button"
                onClick={() => this.findFlights()}
              >
                Find Flights
              </button>
            </div>
          </div>

          <div className="results-col">
            <div className="">
              <div className="flight-results">
                <FlightResults
                  flightData={this.state.flights[0]}
                  currency={this.state.currency}
                  budget={this.state.budget}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
