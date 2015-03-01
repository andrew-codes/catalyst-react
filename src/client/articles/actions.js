'use strict';

import dispatcher from './../Dispatcher';

export function requestArticles(numberToRetrieve) {
	dispatcher.dispatch(requestArticles, {
		numberToRetrieve
	});
}
export function receiveArticles(articles) {
	dispatcher.dispatch(receiveArticles, {
		articles
	});
}
