'use strict';

import stylusTranspiler from './transpilers/stylusTranspiler';

export default Object.freeze({
    route: '/**/*.styl',
    handler: (request, response) => {
        stylusTranspiler(request.url)
            .then(css => {
                response.set('content-type', 'text/css')
                    .status(200)
                    .send(css);
            });
    }
});
