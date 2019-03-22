import React, { Component } from 'react';
import Main from './Main';

function Header() {
	return (
		<div className="header">
			Customer Relationship Management System
		</div>
	);
}

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<Main />
			</div>
		);
	}
}

export default App;
