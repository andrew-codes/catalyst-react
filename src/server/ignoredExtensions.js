'use strict';

let extensions = ['css', 'less', 'sass', 'scss', 'styl'];
let extensionsRegExp = new RegExp('\/\.|~$|\.(' + extensions.join('|') + ')');

export default Object.freeze({
	extensions,
	extensionsRegExp
});
