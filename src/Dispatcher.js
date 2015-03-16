'use strict';

import flux from 'flux';

class Dispatcher extends flux.Dispatcher {
	dispatch(action, data) {
		super.dispatch({action, data});
	}
}

export default new Dispatcher();
