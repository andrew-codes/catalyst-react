'use strict';

export default (server, apis) => {
	apis.forEach(api => {
		server.use(api.route(), (req, res) => {
			api
				.execute(req)
				.then(function (apiResponse) {
					res
						.contentType('application/json')
						.status(apiResponse.isError ? 500 : 200)
						.send(apiResponse);
				});
		});
	});
};
