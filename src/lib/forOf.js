'use strict';

export default function* forOf(obj) {
	for (let key of Object.keys(obj)) {
		yield [key, obj[key]];
	}
}
