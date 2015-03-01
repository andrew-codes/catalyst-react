'use strict';

export default class {
	constructor(requestMatchingRegExp) {
		if (requestMatchingRegExp) {
			this.matchExp = new RegExp(requestMatchingRegExp);
		}
	}
	isAMatch(request) {
		if (!this.matchExp) {
			return false;
		}
		return this.matchExp.test(request.url);
	}
	getMatchingMethod() {
		return () => {};
	}
	route() {
		return '/api';
	}
}
