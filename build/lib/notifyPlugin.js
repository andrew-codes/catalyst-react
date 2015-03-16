'use strict';

import notifier from 'node-notifier';
import path from 'path';

function getLocMessage(error, loc) {
    let filePath = error.module.resource.split(path.sep);
    return [
        filePath[filePath.length - 1],
        ' at [',
        loc.line,
        ',',
        loc.column,
        ']'
    ].join('');
}

export default function () {
    this.plugin('done', function (stats) {
        let error = stats.compilation.errors[0];
        if (!error || !error.message) {
            return;
        }
        let loc = error.error.loc;
        if (!loc) {
            return;
        }
        let msg = '';
        if (loc) {
            msg = getLocMessage(error, loc);
        }
        else {
            msg = error.message;
        }
        notifier.notify({
            title: 'Webpack Error',
            message: msg
        });
    });
};