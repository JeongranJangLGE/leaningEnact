import types from '../actions/actionTypes';
import storage from '../utils/localStorage';

const compareByName = (a, b) => {
	const aName = a.name.toUpperCase();
	const bName = b.name.toUpperCase();

	return (aName < bName && -1) || (aName > bName && 1) || 0;
};

export const customer = (state = {}, action) => {
	switch (action.type) {
		case types.ADD_CUSTOMER: {
			return {
				name: action.name,
				mail: action.mail,
				phone: action.phone
			};
		}
		case types.UPDATE_CUSTOMER: {
			return {
					...state,
					name: action.name,
					phone: action.phone
			};
		}
		default:
			return state;
	}
};

export const customers = (state = [], action) => {
	switch (action.type) {
		case types.ADD_CUSTOMER: {
			const newCustomers = [
				...state,
				customer({}, action)
			];
			newCustomers.sort(compareByName);
			storage.setCustomers(newCustomers);
			return newCustomers;
		}
		case types.UPDATE_CUSTOMER: {
			const {index, name, phone} = action;

			if (index < 0) {
				return state;
			}

			const
				info = state[index],
				shouldUpdated = info.name !== name || info.phone !== phone;
			if (shouldUpdated) {
				const newCustomers = state.slice();
				newCustomers.splice(index, 1, customer(info, action)).sort(compareByName);
				storage.setCustomers(newCustomers);
				return newCustomers;
			} else {
				return state;
			}
		}
		case types.DELETE_CUSTOMER: {
			const newCustomers = state.slice();
			newCustomers.splice(action.index, 1);
			storage.setCustomers(newCustomers);
			return newCustomers;
		}
		default:
			return state;
	}
};

export const displayedIndex = (state = -1, action) => { // eslint-disable-line no-unused-vars
	if (action.type === types.DISPLAY_CUSTOMER) {
		return action.index;
	} else {
		/*
		 * This block is for the cases that action.type is either types.DELETE_CUSTOMER or C.RESET_CUSTOMER
		 * The rest of types have no effect to the return value.
		 */
		return -1;
	}
};
