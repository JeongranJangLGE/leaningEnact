import {connect} from 'react-redux';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import {displayCustomer} from '../../actions/actions';

const CustomersListBase = kind({
	name: 'CustomersListBase',

	propTypes: {
		customers: PropTypes.array,
		onDisplayItem: PropTypes.func
	},

	handlers: {
		displayHandle: (e, {onDisplayItem}) => {
			onDisplayItem(e.target.getAttribute('index'));
		}
	},

	render: ({displayHandle, customers}) => {
		let items = customers.map(({mail, name}, index) =>
			<li
				key={mail}
				name={mail}
				index={index}
				onClick={displayHandle}
			>
				{name}
			</li>
		);
		return (
			<div>
				<ul>
					{(customers.length === 0) ? <p>No customer listed. (Add a customer)</p> : items}
				</ul>
			</div>
		)
	}
});

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
