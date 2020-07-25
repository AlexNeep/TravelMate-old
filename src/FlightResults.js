import React, { Component } from 'react'

import FlightCard from './FlightCard'
class FlightResults extends Component {

    state={
        visible_flights:'0',
        page:'1',
        perPage:'5'
    }
    decodeJsonId = (needle_id,array) => {
        
        for(let i=0;i<array.length;i++){
            if (array[i].id === needle_id){
                return array[i].name
            }
        }
        return 'unknown'
    }

    decodeCurrency = (currency) => {
        if(currency==='GBP'){
            return "£"
        }else{
            return 'unknown'
        }
    }

    incrementPageByOne = () => {
        let MAX_PAGES=10000
        if(this.state.page<MAX_PAGES){
            let new_page_value=parseInt(this.state.page)+1
            this.setState(() => ({
                page:new_page_value
            }))
        }
    }
    decrementPageByOne = () => {
        if(this.state.page>1){
            let new_page_value=parseInt(this.state.page)-1
            this.setState(() => ({
                page:new_page_value
            }))
        }
    }

    getTotalPages = () => {
        return this.state.visible_flights
        // return Math.round(this.props.flightData.quotes.length/parseInt(this.state.perPage))
    }

    render() {
        
        let all_flights = this.props.flightData.quotes
        const PER_PAGE=parseInt(this.state.perPage)
        
        let lower_bound=0+PER_PAGE*(this.state.page-1)
        let upper_bound=PER_PAGE*this.state.page

        let within_budget_flights=all_flights
            .filter((flight) => flight.price <this.props.budget)

        let visible_flights=within_budget_flights.slice(lower_bound,upper_bound)
        
        return(
            <div className='flight-results'>
                 
                    {visible_flights.map((flight) => (
                            
                            <FlightCard
                                id={flight.id}
                                origin={this.decodeJsonId(flight.origin,this.props.flightData.locations)}
                                destination={this.decodeJsonId(flight.destination,this.props.flightData.locations)}
                                carrier={this.decodeJsonId(flight.carrier,this.props.flightData.carriers)}
                                price={flight.price}
                                currency={this.decodeCurrency(this.props.currency)}
                            />
                    ))}
                    <div className='page-navigation'>
                        <div className='page-changer'>
                            <span>
                                <a className='page-button' onClick={() => this.decrementPageByOne()}>
                                   X
                                </a>
                            </span>
                            <span>
                                <a className='page-button' onClick={() => this.incrementPageByOne()}>
                                    X
                                </a>
                            </span>
                        </div>
                        <div className='page-count'>
                            {/* Page {this.getTotalPages()} */}
                            {'Visible Flights: '+this.state.visible_flights}
                        </div>
                    </div>
            </div>
        )
    }


}
export default FlightResults