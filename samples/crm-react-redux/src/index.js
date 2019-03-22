import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './component/App';
import storeFactory from './store/store';
import './index.css';

const store = storeFactory();

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);
