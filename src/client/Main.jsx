'use strict';

import React from 'react';
import Router from 'react-router';
import {getRoutes} from './../../blog/Routes';
import fetchData from './../lib/fetchData';
import rehydrate from './../lib/rehydrate';

let token = rehydrate();
let renderState = {
    element: document.body,
    Handler: null,
    routerState: null
};
let render = () => {
    let { element, Handler, routerState } = renderState;
    fetchData(token, routerState).then((data) => {
        React.render(<Handler data={data} />, element);
    });
};

Router.run(getRoutes(token), Router.HistoryLocation, function(Handler, routerState) {
    renderState.Handler = Handler;
    renderState.routerState = routerState;
    render();
});

//window.blogApp = () => {
//    Router.run(Routes, Router.HistoryLocation, (Handler) => {
//        React.render(<Handler />, document.body);
//    });
//};
