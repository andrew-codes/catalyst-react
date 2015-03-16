'use strict';

import React from 'react';
import {Route, DefaultRoute, NotFoundRoute} from 'react-router';
import App from './App';
import Home from './Home';
import NotFound from './NotFound';

export function getRoutes(token) {
    return [
        <Route handler={App} name="app" path="/"></Route>,
        <NotFoundRoute name="not-found" handler={NotFound} />
    ];
}

