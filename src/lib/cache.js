var cache = {};

var ensureTokenKey = (token) => {
    if (!cache[token]) {
        cache[token] = {};
    }
};

export function setCache(token, key, data) {
    ensureTokenKey(token);
    cache[token][key] = data;
}

export function getFromCache(token, key) {
    ensureTokenKey(token);
    return cache[token][key];
}

export function cleanCache(token) {
    var data = cache[token];
    delete cache[token];
    return data;
}

export function expireCache(token, key) {
    ensureTokenKey(token);
    delete cache[token][key];
}

