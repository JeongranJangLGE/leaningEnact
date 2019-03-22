import {connect} from 'react-redux';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {addCustomer, updateCustomer, deleteCustomer, resetCustomer} from '../../actions/actions';
import Button from '@enact/moonstone/Button';
import LabeledItem from '@enact/moonstone/LabeledItem';
import Input from '@enact/moonstone/Input';

import css from './ProfileForm.module.less';

class CustomerProfile extends Component {
	constructor (props) {
		super(props);
		this.isWritten = false;
		this.state ={
			name: '',
			mail: '',
			phone: ''
		};
	}

	validateCustomerEmail =(mail) => {
		const re = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		return re.test(mail);
	}

	validateCustomerPhone = (phone) => {
		const re =/[0-9]{3}-[0-9]{4}-[0-9]{4}/;
		return re.test(phone);
	}

	handleSave = () => {
		const
			{displayedIndex, onAdd, onUpdate} = this.props,
			{name, mail, phone} = this.state;

		if (name === '' || !this.validateCustomerEmail(mail) || !this.validateCustomerPhone(phone)) {
			return;
		}

		// check if it is new customer or modified customer
		if (this.isWritten) {
			onUpdate(displayedIndex, name, phone);
			this.setState({
				name: '',
				mail: '',
				phone: ''
			});
		} else {
			if (displayedIndex < 0) {
				onAdd(name, mail, phone);
				this.setState({
					name: '',
					mail: '',
					phone: ''
				});
			} else {
				window.alert('Error: This email alreay exists.'); // eslint-disable-line no-alert
			}
		}
	}

	handleReset = () => {
		this.props.onReset();
		this.setState({
			name: '',
			mail: '',
			phone: ''
		});

	}

	handleDelete = () => {
		const {displayedIndex, onDelete} = this.props;
		onDelete(displayedIndex);
		this.setState({
			name: '',
			mail: '',
			phone: ''
		});

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
		if (displayedIndex !== prevProps.displayedIndex) {
			if (displayedIndex >= 0) {
				this.fetchData(
					customers[displayedIndex].name,
					customers[displayedIndex].mail,
					customers[displayedIndex].phone
				);
			}
		}
	}

	render () {
		const {displayedIndex} = this.props;
		this.isWritten = !(displayedIndex < 0)
		if (!this.deleteButton) {
			this.deleteButton =	<Button onClick={this.handleDelete}>delete</Button>;
		}

		return (
			<div>
				<form>
					<div className={css.profileGroup}>
						<LabeledItem
							inline
							component="label"
						>
							Name:
						</LabeledItem>
						<Input
							type="text"
							placeholder="john"
							required
							value={this.state.name}
							onChange={this.setName}
						/>
					</div>
					<div className={css.profileGroup}>
						<LabeledItem
							inline
							component="label"
						>
							E-mail:
						</LabeledItem>
						<Input
							type="email"
							placeholder="john@mail.com"
							required
							value={this.state.mail}
							onChange={this.setMail}
						/>
					</div>
					<div className={css.profileGroup}>
						<LabeledItem
							inline
							component="label"
						>
							Phone:
						</LabeledItem>
						<Input
							type="text"
							placeholder="010-0000-0000"
							pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
							required
							value={this.state.phone}
							onChange={this.setPhone}
						/>
					</div>
					<Button
						name="submit"
						type="submit"
						onClick={this.handleSave}>
						Save
					</Button>
					<Button
						name="reset"
						type="button"
						onClick={this.handleReset}>
						Reset
					</Button>
					{ this.isWritten ? this.deleteButton : null}
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

const ProfileForm = connect(
	state => ({
		displayedIndex: state.displayedIndex,
		customers: state.customers
	}),
	dispatch => ({
		onAdd (name, mail, phone) {
			dispatch(addCustomer(name, mail, phone));
		},
		onUpdate (index, name, phone) {
			dispatch(updateCustomer(index, name, phone));
		},
		onDelete (index) {
			dispatch(deleteCustomer(index));
		},
		onReset () {
			dispatch(resetCustomer());
		},
	})
)(CustomerProfile);

export default ProfileForm;
