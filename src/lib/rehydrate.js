import cache from './cache';

var rehydrate = module.exports = () => {
    let windowData = window.__DATA__ || {data: {}, token: null};
    let {data, token} = windowData;
    Object.keys(data).forEach((key) => {
        cache.set(token, key, data[key]);
    });
    delete window.__DATA__;
    return token;
};

