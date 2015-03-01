'use strict';

import request from 'superagent';
import {
	receiveArticles
}
from './actions';

export function fetchArticles(numberToFetch) {
	request
		.get('api/articles')
		.type('application/json')
		.accept('application/json')
		.query({
			numberToFetch
		})
		.end(function (response) {
			if (!response.body || response.body.length <= 0) {
				return;
			}
			receiveArticles(response.body);
		});
}
