'use strict';

import BasicRestApi from './../lib/BasicRestApi';

function read(numberToSkip, numberToRead) {
	return [];
}

class ArticleApi extends BasicRestApi {
	constructor() {
		super('articles', /\/api\/articles/);
	}
	
}

export default new ArticleApi();
