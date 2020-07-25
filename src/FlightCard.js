import React, { Component } from 'react'


class FlightCard extends Component{


    render(){
        return(
            <div
                key={this.props.id}
                className='flight-card'
            >
                    <div className='col location'>
                        <span>{this.props.origin}</span>
                        <span> -> </span>
                        <span>{this.props.destination}</span>

                        <div>
                            {this.props.carrier}
                        </div>
                    </div>
                
                <div className='col price'>
                    {this.props.currency} {this.props.price}
                </div>

            </div>
        )
    }


}export default FlightCard