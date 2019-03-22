import React, {Component} from 'react';
import List from './customer/List';
import Profile from './customer/Profile';

function Header () {
	return (
		<div className="header">
			Customer Relationship Management System
		</div>
	);
}

class App extends Component {
	render () {
		return (
			<div className="app">
				<Header />
				<Profile />
				<List />
			</div>
		);
	}
}

export default App;
