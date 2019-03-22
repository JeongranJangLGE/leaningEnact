import React, { Component } from 'react';
import CustomerList from './CustomerList';
import ProfileView from './ProfileView';

function compareByName (a, b) {
	const aName = a.name.toUpperCase();
	const bName = b.name.toUpperCase();

	return (aName < bName && -1) || (aName > bName && 1) || 0;
}

function getCustomerFromLocalStorage (key) {
	return JSON.parse(localStorage.getItem(key));
}

function setCustomerInLocalStorage (key, customer) {
	localStorage.setItem(key, JSON.stringify(customer));
}

function removeCustomerFromLocalStorage (key) {
	localStorage.removeItem(key);
}

class Main extends Component {
	constructor () {
		super();
		this.state = {
			customerForDisplay: null,
			customers: []
		};
	}

	saveCustomer = (key, customer, isFilledForm) => {
		const customers = [...this.state.customers];
		const pos = customers.findIndex(customer => (customer.mail === key));

		if (!isFilledForm) {
			if (pos < 0) {
				this.insertCustomer(key, customer);
			} else {
				alert("Error: This email alreay exists.");
				return false;
			}
		} else {
			if (pos < 0) {
				alert("Error: Cannot update customer's information due to unregistered email address. ");
				return false;
			} else {
				this.updateCustomer(key, pos, customer);
			}
		}

		return true;
	}

	insertCustomer = (key, newCustomer) => {
		const customers = [...this.state.customers, newCustomer];

		setCustomerInLocalStorage(key, newCustomer);
		customers.sort((a, b) => compareByName(a, b));
		this.setState({
			customerForDisplay: null,
			customers
		});
	}

	updateCustomer = (key, pos, updatedCustomer) => {
		const customers = [...this.state.customers];

		setCustomerInLocalStorage(key, updatedCustomer);
		customers.splice(pos, 1);
		customers.push(updatedCustomer);
		customers.sort((a, b) => compareByName(a, b));
		this.setState({
			customerForDisplay: null,
			customers
		});
	}

	displayCustomer = (customerForDisplay) => {
		this.setState({
			customerForDisplay
		});
	}

	resetCustomer = () => {
		if (this.state.customerForDisplay) {
			this.setState({
				customerForDisplay: null
			});
		}
	}

	deleteCustomer = (key) => {
		const customers = [...this.state.customers];
		const pos = customers.map(customer => customer.mail).indexOf(key);

		customers.splice(pos, 1);
		removeCustomerFromLocalStorage(key);
		this.setState({
			customerForDisplay: null,
			customers
		});
	}

	componentDidMount () {
		const customers = [];
		for (let key in localStorage) {
			const customerInfo = getCustomerFromLocalStorage(key);
			if (customerInfo) {
				customers.push(customerInfo);
			}
		}

		if (customers.length > 0) {
			customers.sort((a, b) => compareByName(a, b));
			this.setState({
				customers
			});
		}
	}

	render () {
		return(
			<div className="main">
				<CustomerList
					customers={this.state.customers}
					displayItem={this.displayCustomer}
				/>
				<ProfileView
					onSave={this.saveCustomer}
					onCancel={this.resetCustomer}
					onDelete={this.deleteCustomer}
					customer={this.state.customerForDisplay}
				/>
			</div>
		);
	}
}

export default Main;
