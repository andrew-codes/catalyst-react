'use strict';

import requireDir from 'require-dir';
import _ from 'underscore';

export default (urlPath) => {
	let transformsMap = requireDir('./cacheTransforms');
	let transforms = Object.keys(transformsMap).map((key) => {
		return transformsMap[key];
	});
	return _.find(transforms, (transform) => {
			return transform.isAMatch(urlPath);
		})
		.transform(urlPath);
};
