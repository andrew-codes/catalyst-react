'use strict';

import React from 'react';
import Router from 'react-router';
import Routes from './../../blog/Routes';

window.blogApp = () => {
	Router.run(Routes, Router.HistoryLocation, (Handler) => {
		React.render(<Handler />, document.body);
	});
};
