import React, { Component } from 'react'
import superagent from 'superagent'
import { connect } from 'react-redux'
import actions from '../actions'

class Nav extends Component {

	constructor(){
		super()
		this.state = {
			zipCode: '',
			filter: 'food'
		}
	}

	searchVenues(event){
		event.preventDefault()

		console.log('searchVenues: '+this.state.zipCode)
		const url = 'https://api.foursquare.com/v2/venues/search'

		const params = {
			v: '20140806',
			near: this.state.zipCode, // zip code, new york, chicago,
			client_id: 'VZZ1EUDOT0JYITGFDKVVMCLYHB3NURAYK3OHB5SK5N453NFD',
			client_secret: 'UAA15MIFIWVKZQRH22KPSYVWREIF2EMMH0GQ0ZKIQZC322NZ',
			query: this.state.filter
		}

		superagent
		.get(url)
		.query(params)
		.set('Accept', 'application/json')
		.end((err, response) => {
			const venues = response.body.response.venues

			this.props.venuesReceived(venues)

		})
	}

	changeFilter(event){
		console.log('changeFilter: '+event.target.value)
		this.setState({
			filter: event.target.value
		})


	}

	updateZipcode(event){
//		console.log('updateZipcode: '+event.target.value)
		// this.state['zipCode'] = event.target.value // WRONG!

		// RIGHT!
		this.setState({
			zipCode: event.target.value
		})
	}

	render(){
		return (
			<nav className="navbar navbar-default" style={{background: '#f5f5f5'}}>
			    <div className="container-fluid">
				    <div className="navbar-header" style={{margin: '0 auto'}}>
						<form className="navbar-form navbar-left" role="search">
							<div className="form-group">
								<input onChange={this.updateZipcode.bind(this)} className="form-control" type="text" placeholder="Zip Code"  style={{color: '#4CAF50', marginRight: '5px'}}/>
								<select id="filter" onChange={this.changeFilter.bind(this)} style={{marginLeft:12}} className="form-control"  style={{color: '#4CAF50'}}>
									<option value="food">Food</option>
									<option value="coffee">Coffee</option>
									<option value="clothing">Clothing</option>
									<option value="music">Music</option>
									<option value="fitness">Fitness</option>
								</select>
							</div>
							<button onClick={this.searchVenues.bind(this)} className="btn btn-default" style={{border: '1px solid #4CAF50', color: '#4CAF50', marginLeft: '4'}}>Search</button>
						</form>
				    </div>
			    </div>
			</nav>

		)
	}
}

const stateToProps = (state) => {
	return {
		venues: state.venue
	}
}

const dispatchToProps = (dispatch) => {
	return {
		venuesReceived: (venues) => dispatch(actions.venuesReceived(venues))
	}
}


export default connect(stateToProps, dispatchToProps)(Nav)





