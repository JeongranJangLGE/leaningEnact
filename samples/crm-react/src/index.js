import React from 'react';
import { render } from 'react-dom';
import App from './component/App';
import './index.css';

window.React = React

render(
	<App />,
	document.getElementById('root')
);
