import Button from '@enact/moonstone/Button';
import {connect} from 'react-redux';
import Input from '@enact/moonstone/Input';
import LabeledItem from '@enact/moonstone/LabeledItem';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

import {addCustomer, updateCustomer, deleteCustomer, resetCustomer} from '../../actions/actions';

import css from './ProfileForm.module.less';

class CustomerProfile extends Component {
	constructor (props) {
		super(props);
		this.isWritten = false;
		this.state = {
			mail: '',
			name: '',
			phone: ''
		};
	}

	clearCustomerInfo = () => {
		this.setState({
			name: '',
			mail: '',
			phone: ''
		});
	}

	validateCustomerEmail = (mail) => {
		const re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		return re.test(mail);
	}

	validateCustomerPhone = (phone) => {
		const re = /[0-9]{3}-[0-9]{4}-[0-9]{4}/;
		return re.test(phone);
	}

	handleSave = () => {
		const
			{displayedIndex, onAdd, onUpdate} = this.props,
			{name, mail, phone} = this.state;

		if (name || !this.validateCustomerEmail(mail) || !this.validateCustomerPhone(phone)) {
			return;
		}

		// check if it is new customer or modified customer
		if (this.isWritten) {
			onUpdate(displayedIndex, name, phone);
			this.clearCustomerInfo();
		} else {
			if (displayedIndex < 0) {
				onAdd(name, mail, phone);
				this.clearCustomerInfo();
			} else {
				window.alert('Error: This email alreay exists.'); // eslint-disable-line no-alert
			}
		}
	}

	handleReset = () => {
		this.props.onReset();
		this.clearCustomerInfo();
	}

	handleDelete = () => {
		const {displayedIndex, onDelete} = this.props;
		onDelete(displayedIndex);
		this.clearCustomerInfo();
	}

	setName = (e) => {
		this.setState(prevState => ({
			...prevState,
			name: e.value
		}));
	}

	setMail = (e) => {
		this.setState(prevState => ({
			...prevState,
			mail: e.value
		}));
	}

	setPhone = (e) => {
		this.setState(prevState => ({
			...prevState,
			phone: e.value
		}));
	}

	fetchData = (name, mail, phone) => {
		this.setState({
			name,
			mail,
			phone
		});
	}

	componentDidUpdate (prevProps) {
		const {customers, displayedIndex} = this.props;
		if (displayedIndex !== prevProps.displayedIndex && displayedIndex >= 0) {
			this.fetchData(
				customers[displayedIndex].name,
				customers[displayedIndex].mail,
				customers[displayedIndex].phone
			);
		}
	}

	render () {
		const {displayedIndex} = this.props;
		this.isWritten = !(displayedIndex < 0)
		if (!this.deleteButton) {
			this.deleteButton = <Button onClick={this.handleDelete}>delete</Button>;
		}

		return (
			<div>
				<form>
					<div className={css.profileGroup}>
						<LabeledItem
							component="label"
							inline
						>
							Name:
						</LabeledItem>
						<Input
							onChange={this.setName}
							placeholder="john"
							required
							value={this.state.name}
						/>
					</div>
					<div className={css.profileGroup}>
						<LabeledItem
							component="label"
							inline
						>
							E-mail:
						</LabeledItem>
						<Input
							onChange={this.setMail}
							placeholder="john@mail.com"
							required
							type="email"
							value={this.state.mail}
						/>
					</div>
					<div className={css.profileGroup}>
						<LabeledItem
							component="label"
							inline
						>
							Phone:
						</LabeledItem>
						<Input
							onChange={this.setPhone}
							pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
							placeholder="010-0000-0000"
							required
							value={this.state.phone}
						/>
					</div>
					<Button
						name="submit"
						onClick={this.handleSave}
					>
						Save
					</Button>
					<Button
						name="reset"
						onClick={this.handleReset}
						type="button"
					>
						Reset
					</Button>
					{this.isWritten ? this.deleteButton : null}
				</form>
			</div>
		);
	}
}

CustomerProfile.propTypes = {
	customers: PropTypes.array,
	displayedIndex: PropTypes.number,
	onAdd: PropTypes.func,
	onDelete: PropTypes.func,
	onReset: PropTypes.func,
	onUpdate: PropTypes.func
};

const ProfileForm = connect(
	state => ({
		customers: state.customers,
		displayedIndex: state.displayedIndex
	}),
	dispatch => ({
		onAdd (name, mail, phone) {
			dispatch(addCustomer(name, mail, phone));
		},
		onDelete (index) {
			dispatch(deleteCustomer(index));
		},
		onReset () {
			dispatch(resetCustomer());
		},
		onUpdate (index, name, phone) {
			dispatch(updateCustomer(index, name, phone));
		}
		})
)(CustomerProfile);

export default ProfileForm;
