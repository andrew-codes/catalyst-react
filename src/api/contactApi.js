var Promise = require('bluebird');
var axios = require('axios');
var {getFromCache, setCache} = require('./../lib/cache');

var HOST = 'http://addressbook-api.herokuapp.com';

export function getContacts(url, token) {
    var cached = getFromCache(token, url);
    return (cached) ?
        Promise.resolve(cached) :
        axios({
            url: HOST + url,
            headers: {'Authorization': token}
        }).then(function (res) {
            setCache(token, url, res.data);
            return res.data;
        });
}