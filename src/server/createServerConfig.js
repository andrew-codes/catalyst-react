'use strict';

import ignored from './ignoredExtensions';
import pkg from './../../package.json';
import _ from 'underscore';
import articlesFirebaseDataService from './api/firebase/articlesDataService';

let dataServices = {
    articles: articlesFirebaseDataService
};

export default (config) => {
    return Object.freeze(_.extend({
        dataServices: dataServices
    }, config, {
        isProduction: process.env.NODE_ENV === 'production',
        piping: {
            ignore: ignored.extensionsRegExp,
            hook: true
        },
        port: process.env.PORT || 3000,
        version: pkg.version
    }));
};
