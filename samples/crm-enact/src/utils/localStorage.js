const customers = () => {
	return ({
		has: () => !!window.localStorage.getItem('customers'),
		get: () => (JSON.parse(window.localStorage.getItem('customers'))),
		set: (newCustomers) => {
			window.localStorage.clear('customers');
			window.localStorage.setItem('customers', JSON.stringify(newCustomers))
		}
	});
};

const customer = () => {
	return ({
		get: (key) => (customers().get().find(item => item.mail === key)),
		getIndex: (key) => (customers().get().findIndex(item => item.mail === key))
	})
};

const storage = {
	hasData: () => customers().has(),
	getIndex: (key) => customer().getIndex(key),
	getCustomer: (key) => customer().get(key),
	getCustomers: () => customers().get(),
	setCustomers: (newCustomers) => customers().set(newCustomers)
};

export default storage;
