'use strict';

import {getFromCache, setCache} from './../lib/cache';
import axios from 'axios';
import Promise from 'bluebird';
import config from './config';

export function getArticles(token) {
    let cached = getFromCache(token, '/api/articles');
    return (cached) ?
        Promise.resolve(cached) :
        axios.get(`${config.url}/api/articles`)
            .then((results)=> {
                setCache(token, '/api/articles', results);
                return results;
            })
            .catch((response)=> {
                if (response instanceof Error) {
                    console.log('Error', response.message);
                } else {
                    console.log(response.data);
                    console.log(response.status);
                    console.log(response.headers);
                    console.log(response.config);
                }
                Promise.reject(response);
            });
}