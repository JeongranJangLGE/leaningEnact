import kind from '@enact/core/kind';
import {Layout, Cell} from '@enact/ui/Layout';
import {Panel} from '@enact/moonstone/Panels';
import React from 'react';
import Scroller from '@enact/ui/Scroller';

import CustomersList from '../components/CustomersList/CustomersList';
import ProfileForm from '../components/ProfileForm/ProfileForm';

const MainPanel = kind({
	name: 'MainPanel',

	render: (props) => (
		<Panel {...props}>
			<h1>Customer Management System</h1>
			<Layout>
				<Cell component="div" shrink>
					<ProfileForm />
				</Cell>
				<Cell component="div">
					<Scroller direction="vertical">
						<CustomersList />
					</Scroller>
				</Cell>
			</Layout>
		</Panel>
	)
});

export default MainPanel;
