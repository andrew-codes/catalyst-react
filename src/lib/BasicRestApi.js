'use strict';

export default class {
	constructor(requestMatchingRegExp) {
		if (name, requestMatchingRegExp) {
			this.matchExp = new RegExp(requestMatchingRegExp);
		}
	}
	name() {
		return this.name;
	}
	isAMatch(request) {
		if (!this.matchExp) {
			return false;
		}
		return this.matchExp.test(request.url);
	}
	getMatchingMethod(request) {
		if (request.method === 'get') {
			if (request.params.id) {
				return (req) => {
					return this.readById(req.params.id);
				};
			}
			return (req) => {
				return this.read(req.query);
			};
		}
		if (request.method === 'put'){
			return (req) =>{
				return this.update(req.body);
			};
		}
		if (request.method === 'post'){
			return (req) => {
				return this.create(req.body);
			};
		}
		if (request.method === 'delete'){
			return (req) => {
				return this.remove(req.body);
			};
		}
		return (req) => {
			return {
				isError: true,
				message: 'No matched API method',
				req
			};
		};
	}
	route() {
		return `/api/${this.name}/:id`;
	}
	read(queryParams) {
		return [];
	}
	readById(id) {
		return {
			id
		};
	}
	create(payload) {
		return payload;
	}
	update(payload) {
		return payload;
	}
	remove(id) {
		return id;
	}
}
