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

	_getPcFrom: function(who) {
		let pcs = this.persistentCharacters.filter((pc) => pc === who || pc.id === who);
		if (pcs.length < 1) throw new Error("Unrecognized persistent char: ", who);
		if (pcs.length > 1) throw new Error("Ambiguous persistent char: ", who, pcs);
		return pcs[0];
	},


	onAdd: function(input) {
		this.persistentCharacters = this.persistentCharacters.concat(pluralize(input));
		this._trigger();
	},

	onRemove: function(input) {
		let goodbye = pluralize(input);
		this.persistentCharacters = this.persistentCharacters.filter((c) => (goodbye.indexOf(c) < 0));
		this._trigger();
	},

	onSetName: function(args) {
		let pc = this._getPcFrom(args.who);
		pc.name = args.name || "";
		this._trigger();
	},

	onSetPortrait: function(args) {
		let pc = this._getPcFrom(args.who);
		pc.setImgUrl(args.url);
		this._trigger();
	},
});


function pluralize(x) {
	if (x == null) return [];
	if (Array.isArray(x)) return x;
	return [x];
};

function getPcFromWho(who) {

};
