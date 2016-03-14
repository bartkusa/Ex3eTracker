"use strict";

import * as knobActions from 'ex3/actions/KnobActions';
import { setState, replaceState } from './storeUtils';


export default {

	listenables: knobActions,

	setState,
	replaceState,

	init: function() {
		this.replaceState(null);
	},


	onStart: function() {
		this.replaceState({
			isOn: true,
		});
	},

	onEnd: function() {
		this.replaceState({
			isOn: false,
		});
	},

};
	