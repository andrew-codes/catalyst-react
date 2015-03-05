'use strict';

import cacheStore from './../staticCache/cacheStore';

export default Object.freeze({
	route: '/**/*.styl',
	execute: (request, response) =>{
		let css = cacheStore(request.url);
		response.set('content-type', 'text/css')
			.status(200)
			.send(css);
	}
});
