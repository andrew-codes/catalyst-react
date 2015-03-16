'use strict';

import createServerConfig from './createServerConfig';
import expressServer from './expressServer';
import requireDir from 'require-dir';

export default function (config) {
    function start() {
        return expressServer(createServerConfig(config));
    }

    return {
        start: start
    };
};
