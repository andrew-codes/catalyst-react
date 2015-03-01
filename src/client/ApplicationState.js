'use strict';

import State from './../lib/State';

let applicationState = {
	articles: [],
	tags: []
};
export default function setState(state) {
	applicationState = state;
}
export const state = new State(applicationState);
export const articles = state.cursor('articles');
export const tags = state.cursor('tags');
