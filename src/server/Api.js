'use strict';
import requireDir from 'require-dir';
var apis = requireDir('./api');
import Promise from 'bluebird';

function noMatchingApi(request) {
	return {
		isError: true,
		payload: {
			message: 'No matching API',
			request
		}
	};
}

function matchedApiMethod(request, apiMethod) {
	return {
		execute: function () {
			return new Promise(function (resolve) {
				resolve(apiMethod(request));
			});
		}
	};
}

export default function Api(request) {
	var matchingApi = apis.filter(api => {
		api.isAMatch(request);
	});
	if (matchingApi.length < 0) {
		return matchedApiMethod(request, noMatchingApi);
	}
	if (matchingApi.length > 1) {
		console.log('Multiple APIs matched', request);
	}
	return matchedApiMethod(request, matchingApi[0].getMatchingMethod(request));
}
