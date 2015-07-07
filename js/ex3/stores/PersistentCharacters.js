"use strict";

const reflux = require('reflux');
const charActions = require('ex3/actions/CharActions');
const PersistentCharacterModel = require('ex3/models/PersistentCharacter');

const LOCAL_STORAGE_KEY = "savedPersistentCharacters";


module.exports = reflux.createStore({
	listenables: charActions,

	init: function() {
		this.persistentCharacters = [];
		// TODO: Create id->char map?
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


	// Persistence /////////////////////////////////////////////////////////////////////////////////////////////////////

	onSave: function() {
		const pcData = {
			version: 1,
			chars: this.persistentCharacters
		};
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pcData));
		alert("Your stuff is saved");
	},

	onLoad: function() {
		const pcJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!pcJSON) return;

		const pcData = JSON.parse( pcJSON );
		if (pcData.version !== 1) throw new Error("Loading failed; version mismatch: " + pcData.version);

		PersistentCharacterModel.updateUniqueId(pcData.chars);
		this.persistentCharacters = (pcData.chars || []).map((pcDatum) => new PersistentCharacterModel(pcDatum));
		this._trigger();
	},


	// Population functions ////////////////////////////////////////////////////////////////////////////////////////////

	onAdd: function(input) {
		this.persistentCharacters = this.persistentCharacters.concat(pluralize(input));
		this._trigger();
	},

	onRemove: function(input) {
		let goodbye = pluralize(input);
		this.persistentCharacters = this.persistentCharacters.filter((c) => (goodbye.indexOf(c) < 0));
		this._trigger();
	},


	// Mutations ///////////////////////////////////////////////////////////////////////////////////////////////////////
	onSetName: function(args) {
		const pc = this._getPcFrom(args.who);
		pc.name = args.name || "";
		this._trigger();
	},

	onSetPortrait: function(args) {
		const pc = this._getPcFrom(args.who);
		pc.setImgUrl(args.url);
		this._trigger();
	},
});


function pluralize(x) {
	if (x == null) return [];
	if (Array.isArray(x)) return x;
	return [x];
};
