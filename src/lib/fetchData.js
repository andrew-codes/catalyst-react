import Promise from 'bluebird';

export default (token, routerState) => {
    let { params, query } = routerState;
    let promises = routerState.routes.filter((route) => {
        return route.handler.fetchData;
    }).reduce((promises, route) => {
        promises[route.name] = route.handler.fetchData(token, params, query);
        return promises;
    }, {});
    return Promise.props(promises);
};

