'use strict';

let keys = Object.freeze({
    articles: 'articles'
});

export default keys;

export function isADataService(dataServiceKey) {
    return Object.keys(keys).filter((key)=> {
            return key === dataServiceKey;
        }).length > 0;
}