'use strict';

import dispatcher from './../Dispatcher';
import * as actions from './actions';
import {
	articlesCursor
}
from './../ApplicationState';

export const dispatchToken = dispatcher.register((payload) => {
	let {
		action, data
	} = payload;

	switch (action) {
		case actions.receiveArticles:
			let {
				articles
			} = data;
			articlesCursor(articles => {
				return articles.withMutations(list => {
					articles.forEach(article => {
						list.push(article);
					});
				});
			});
			break;
		default:
			break;
	}
});

export function getArticles() {
	return articlesCursor();
}

export function getArticle(id) {
	var articles = getArticles().filter(article => article.id === id);
	if (articles.length <0){
		return {};
	}
	return articles[1];
}
