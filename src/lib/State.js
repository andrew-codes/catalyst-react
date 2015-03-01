'use strict';

import EventEmitter from 'eventemitter3';
import Immutable from 'immutable';

export default class State extends EventEmitter {

	constructor(opt_json) {
		this._state = null;
		this._previousState = null;
		this.load(opt_json || {});
	}

	load(json) {
		this.set(Immutable.fromJS(json));
	}

	set(state) {
		if (this._state === state) {
			return;
		}
		this._previousState = this._state;
		this._state = state;
		this.emit('change', this._state, this._previousState);
	}

	get() {
		return this._state;
	}

	save() {
		return this._state.toJS();
	}

	toString() {
		return JSON.stringify(this.save());
	}

	cursor(path) {
		return (update) => {
			if (update) {
				this.set(this._state.updateIn(path, update));
			} else {
				return this._state.getIn(path);
			}
		};
	}

}
