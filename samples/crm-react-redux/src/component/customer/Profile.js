import {connect} from 'react-redux';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addCustomer, updateCustomer, deleteCustomer, resetCustomer} from '../../actions';

function addButton (name, handle) {
	return (
		<button type="button" onClick={handle}>
			{name}
		</button>
	);
}

function enableElement (element) {
	if (element.disabled) {
		element.disabled = false;
	}
}

function disableElement (element) {
	if (!element.disabled) {
		element.disabled = true;
	}
}

class CustomerProfile extends Component {
	constructor (props) {
		super(props);
		this.formRef = React.createRef();
		this.isWritten = false;
	}

	handleSave = (e) => {
		const
			{displayedIndex, onAdd, onUpdate} = this.props,
			form = e.target.form,
			name = form.name.value,
			mail = form.mail.value,
			phone = form.phone.value;

		if (name === '' || mail === '' || phone === '') {
			return;
		}

		// check if it is new customer or modified customer
		if (this.isWritten) {
			onUpdate(displayedIndex, name, phone);
		} else {
			if (displayedIndex < 0) {
				onAdd(name, mail, phone);
			} else {
				alert('Error: This email alreay exists.');
			}
		}

		e.preventDefault();
	}

	handleReset = (e) => {
		this.clearForm(e.target.form);
		this.props.onReset();
	}

	handleDelete = (e) => {
		const {displayedIndex, onDelete} = this.props;
		onDelete(displayedIndex);
	}

	clearForm = (target) => {
		enableElement(target.mail);
		target.name.value = '';
		target.mail.value = '';
		target.phone.value = '';
	}

	componentDidMount () {
		const form = this.formRef.current;
		form.submit.addEventListener('click', this.handleSave);
		form.reset.addEventListener('click', this.handleReset);
	}

	componentWillUpdate (nextProps, nextState) {
		const {customers, displayedIndex} = nextProps;
		const form = this.formRef.current;

		if (displayedIndex < 0) {
			this.clearForm(form);
			this.isWritten = false;
			this.deleteButton = null;
		} else {
			form.name.value = customers[displayedIndex].name;
			form.mail.value = customers[displayedIndex].mail;
			form.phone.value = customers[displayedIndex].phone;
			this.isWritten = true;
			disableElement(form.mail);
			this.deleteButton = addButton('delete', this.handleDelete);
		}
	}

	render () {
		return (
			<div className="viewContainer">
				<form ref={this.formRef}>
					<div>
						<label>Name: </label>
						<input
							name="name"
							type="text"
							placeholder="username"
							required
						/>
					</div>
					<div>
						<label>E-mail: </label>
						<input
							name="mail"
							type="email"
							placeholder="username@mail.com"
							required
						/>
					</div>
					<div>
						<label>Phone: </label>
						<input
							name="phone"
							type="text"
							placeholder="phone number: 010-xxxx-xxxx"
							pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
							required
						/>
					</div>
					<button
						name="submit"
						type="submit">
						Save
					</button>
					<button
						name="reset"
						type="button">
						Reset
					</button>
					{this.deleteButton}
				</form>
			</div>
		);
	}
}

CustomerProfile.propTypes = {
	customers: PropTypes.array,
	displayedIndex: PropTypes.number,
	onAdd: PropTypes.func,
	onUpdate: PropTypes.func,
	onDelete: PropTypes.func,
	onReset: PropTypes.func
};

const Profile = connect(
	state => ({
		displayedIndex: state.displayedIndex,
		customers: state.customers
	}),
	dispatch => ({
		onAdd (name, mail, phone) {
			dispatch(addCustomer(name, mail, phone))
		},
		onUpdate (index, name, phone) {
			dispatch(updateCustomer(index, name, phone))
		},
		onDelete (index) {
			dispatch(deleteCustomer(index))
		},
		onReset () {
			dispatch(resetCustomer())
		},
	})
)(CustomerProfile);

export default Profile;
