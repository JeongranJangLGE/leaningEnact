import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {displayCustomer} from '../../actions/actions';

class CustomersListBase extends Component {
	displayHandle = (e) => {
		const {onDisplayItem} = this.props;
		onDisplayItem(e.target.getAttribute('index'));
	}
	render() {
		const {customers} = this.props;
		return (
			<div>
				<ul>
					{
						(customers.length === 0) ?
						<p>No customer listed. (Add a customer)</p>
							:
							customers.map(({mail, name}, index) =>
								<li
									key={mail}
									name={mail}
									index={index}
									onClick={this.displayHandle}
								>
									{name}
								</li>
							)
					}
				</ul>
			</div>
		)
	}
};

CustomersListBase.propTypes = {
	customers: PropTypes.array,
	onDisplayItem: PropTypes.func
};

const CustomersList = connect(
	state => ({
		customers: state.customers
	}),
	dispatch => ({
		onDisplayItem (index) {
			dispatch(displayCustomer(index))
		}
	})
)(CustomersListBase);

export default CustomersList;
