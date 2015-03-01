'use strict';

import BaseApi from './../lib/BaseApi';

function read(numberToSkip, numberToRead) {
	return [];
}

class ArticleApi extends BaseApi {
	constructor() {
		super(/\/api\/articles/);
	}

	getMatchingMethod(request) {
		return read;
	}
	route() {
		return `${super.route()}/articles`;
	}
}

export default new ArticleApi();
