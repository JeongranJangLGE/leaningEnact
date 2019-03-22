import PropTypes from 'prop-types';
import React from 'react';

const CustomerList = ({customers=[], displayItem=f=>f}) => {

	const handleItem = (e) => {
		const name = e.target.getAttribute('name');
		const selectedItem = JSON.parse(localStorage.getItem(name));

		displayItem(selectedItem);
	}

	return(
		<div className="listContainer">
			<ul>
				{(customers.length === 0) ?
				<p>No customer listed. (Add a customer)</p> :
					customers.map((customer) =>
						<li key={customer.mail}
						name={customer.mail}
						onClick={handleItem}>
						{customer.name}
					</li>
					)
				}
			</ul>
		</div>
	)
}

CustomerList.propTypes = {
	customers: PropTypes.array,
	displayItem:PropTypes.func
}

export default CustomerList;
