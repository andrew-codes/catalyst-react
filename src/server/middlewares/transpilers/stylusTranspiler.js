'use strict';

import Promise from 'bluebird';
import path from 'path';
import url from 'url';
import stylus from 'stylus';
import fs from 'fs';

export default function (urlPath) {
    let stylusPath = path.normalizePath(decodeURI(url.parse(urlPath).pathname()));
    return new Promise((resolve, reject) => {
        fs.readFile(stylusPath, 'utf-8', (error, contents)=> {
            if (error) {
                reject(error);
            }
            stylus(contents).render((err, css)=> {
                if (err) {
                    reject(err);
                }
                resolve(css);
            })
        });
    });
};