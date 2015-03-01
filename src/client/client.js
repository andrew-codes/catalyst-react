'use strict';

import React from 'react';
import Router from 'react-router';
import {setState} from './ApplicationState';

window.blogApp = (data, routes) => {
	let appState = JSON.parse(data);
	setState(appState);
	// TODO: Check hashchange.
	Router.run(routes, Router.HistoryLocation, (Handler) => {
		React.render(<Handler />, document.body);
	});
};
