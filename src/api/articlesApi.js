'use strict';

import {getFromCache, setCache} from './../lib/cache';
import axios from 'axios';
import Promise from 'bluebird';

export function getArticles(token) {
    let cached = getFromCache(token, '/api/articles');
    return (cached) ?
        Promise.resolve(cached) :
        axios.get('/api/articles')
            .then((results)=> {
                setCache(token, '/api/articles', results);
                return results;
            });
}