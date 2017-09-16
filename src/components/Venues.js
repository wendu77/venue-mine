import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import { Nav } from './Nav'

class Venues extends Component {

	render(){
		const venues = this.props.venues || []

		return (
			<div className="row" style={{marginRight:'0', marginBottom: '40px'}}>
				
				<div className="col-md-11 col-md-offset-2" style={{maxWidth: '900px', padding: '20px 20px 20px 20px'}}>
					<ol>
						{ venues.map((venue, i) => {
								return (
									<li key={venue.id} style={{listStyle: 'none'}}>
										<div style={{padding:20, marginBottom:12, background:'#f5f5f5'}}>
											<h4 style={{marginBottom:0, color: '#4CAF50'}}>{venue.name}</h4>
											<span style={{marginBottom:0, color: '#4CAF50'}}>{venue.location.address}</span><br />
											<a  style={{marginBottom:0, color: '#4CAF50'}} href={venue.url}>{venue.url}</a>
										</div>
									</li>
								)
							})
						}
					</ol>
				</div>

			</div>
		)
	}	
}

const stateToProps = (state) => {
	return {
		venues: state.venue.venues
	}
}

export default connect(stateToProps)(Venues)




