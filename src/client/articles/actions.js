'use strict';

import dispatcher from './../Dispatcher';

export function retrieveArticles(numberToRetrieve) {
	dispatcher.dispatch(retrieveArticles, {
		numberToRetrieve
	});
}
export function receiveArticles(articles) {
	dispatcher.dispatch(receiveArticles, {
		articles
	});
}
