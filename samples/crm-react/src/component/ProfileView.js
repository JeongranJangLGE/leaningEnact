import React, { Component } from 'react';


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

class ProfileView extends Component {
	constructor (props) {
		super(props);
		this.formRef = React.createRef();
		this.isFilledForm = false;
	}

	handleSave = (e) => {
		const name = e.target.form.name.value;
		const mail = e.target.form.mail.value;
		const phone = e.target.form.phone.value;

		if (name !== '' || mail !== '' || phone !== '') {
			const info = {
				name,
				mail,
				phone
			}
			const retval = this.props.onSave(mail, info, this.isFilledForm);
			if (!retval) {
				this.clearForm(e.target);
			}
		}
		e.preventDefault();
	}

	handleCancel = (e) => {
		const form = e.target.form;
		enableElement(form.mail);
		this.clearForm(form);
		this.isFilledForm = false;
		this.props.onCancel();
		e.preventDefault();
	}

	handleDelete = (e) => {
		const form = e.target.form;
		this.props.onDelete(form.mail.value);
		e.preventDefault();
	}

	clearForm = (target) => {
		target.name.value = '';
		target.mail.value = '';
		target.phone.value = '';
	}

	setCustomerInfo = (customer) => {
		if (customer) {
			const form = this.formRef.current;
			form.name.value = customer.name;
			form.mail.value = customer.mail;
			form.phone.value = customer.phone;
		}
	}

	componentDidMount() {
		const form = this.formRef.current;
		form.submit.addEventListener('click', this.handleSave);
		form.cancel.addEventListener('click', this.handleCancel);
	}

	componentWillUpdate (nextProps, nextState) {
		const customer = nextProps.customer;
		const form = this.formRef.current;

		if (customer) {
			this.setCustomerInfo(customer);
			this.isFilledForm = true;
			disableElement(form.mail);
			this.deleteButton = addButton('delete', this.handleDelete);
		} else {
			this.clearForm(form);
			this.isFilledForm = false;
			enableElement(form.mail);
			this.deleteButton = null;
		}
	}

	render () {
		return(
			<div className="viewContainer">
				<form
					ref={this.formRef} >
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
						name="cancel"
						type="button">
						Cancel
					</button>
					{this.deleteButton}
				</form>
			</div>
		);
	}
}

export default ProfileView;
