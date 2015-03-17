'use strict';

import createServerConfig from './createServerConfig';
import expressServer from './expressServer';
import requireDir from 'require-dir';
import {isADataService} from './../DataServiceKeys';

export default function (config) {
    function start() {
        return expressServer(createServerConfig(config));
    }

    function use(dataServiceKey, dataService) {
        if (!isADataService(dataServiceKey)) {
            return;
        }
        config.dataServices[dataServiceKey] = dataService;
    }

    return {
        start: start,
        use: use
    };
};
