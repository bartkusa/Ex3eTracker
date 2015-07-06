"use strict";

let reflux = require('reflux');
let	charActions = require('ex3/actions/CharActions');


let PersistentCharacters = module.exports = reflux.createStore({
	listenables: charActions,

	init: function() {
		this.persistentCharacters = [];
	},

	_trigger: function() {
		this.trigger({
			persistentCharacters: this.persistentCharacters
		});
	},

	onAdd: function(input) {
		this.persistentCharacters = this.persistentCharacters.concat(pluralize(input));
		this._trigger();
	},

	onRemove: function(input) {
		let goodbye = pluralize(input);
		this.persistentCharacters = this.persistentCharacters.filter((c) => (goodbye.indexOf(c) < 0));
		this._trigger();
	}
});


function pluralize(x) {
	if (x == null) return [];
	if (Array.isArray(x)) return x;
	return [x];
};
