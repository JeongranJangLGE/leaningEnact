import types from './actionTypes';

export const addCustomer = (name, mail, phone) => ({
	type: types.ADD_CUSTOMER,
	name,
	mail,
	phone
});

export const updateCustomer = (index, name, phone) => ({
	type: types.UPDATE_CUSTOMER,
	index,
	name,
	phone
});

export const deleteCustomer = (index) => ({
	type: types.DELETE_CUSTOMER,
	index
});

export const displayCustomer = (index) => ({
	type: types.DISPLAY_CUSTOMER,
	index
});

export const resetCustomer = () => ({
	type: types.RESET_CUSTOMER
});
