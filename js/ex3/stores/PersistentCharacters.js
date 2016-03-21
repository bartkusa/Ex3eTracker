"use strict";

import * as charActions from 'ex3/actions/CharActions';
import * as charUtils from './CharUtils';
import { setState, replaceState } from './storeUtils';
import gaEvent from 'ex3/funcs/ga';

const  DEFAULT_PERSISTENT_CHARACTERS = require('ex3/data/DefaultPersistentCharacters');

export const LOCAL_STORAGE_KEY = "savedPersistentCharacters";
export const DEFAULT_IMAGE_URL = "./img/charDefault.jpg"; // TODO: Define image root location


export default {

	listenables: charActions,

	setState,
	replaceState,

	init: function() {
		this.replaceState({
			nextId: 0,
			persistentCharacters: [], // should this be a map of id->obj?
		});
	},


	// Population functions ////////////////////////////////////////////////////////////////////////////////////////////

	onAdd: function(input) {
		// TODO validation
		const newPCs = charUtils.pluralize(input);

		// Assign new IDs
		var nextId = this.state.nextId;
		newPCs.forEach((newPC) => {
			newPC.id = nextId++;
			if (!newPC.imgUrl) newPC.imgUrl = DEFAULT_IMAGE_URL;
		});

		this.setState({
			nextId: nextId,
			persistentCharacters: [...newPCs, ...this.state.persistentCharacters],
			notes: null,
		});

		gaEvent('persistent-characters', 'pc-add');
	},

	onRemove: function(input) {
		const idsToPurge = charUtils.toIds(input);
		const purgedPCs = this.state.persistentCharacters
				.filter( (pc) => idsToPurge.indexOf(pc.id) < 0 );

		this.setState({
			// nextId: this.state.nextId,
			persistentCharacters: purgedPCs,
		});

		gaEvent('persistent-characters', 'pc-remove');
	},


	// Mutations ///////////////////////////////////////////////////////////////////////////////////////////////////////

	onSetName: function(args) {
		this.state.persistentCharacters
				.filter((pc) => charUtils.idsMatch(pc, args.who))
				.forEach((pc) => {
					pc.name = args.name || "";
				}); // this is so stupid just do redux already

		this.setState();
	},

	onSetPortrait: function(args) {
		this.state.persistentCharacters
				.filter((pc) => charUtils.idsMatch(pc, args.who))
				.forEach((pc) => {
					pc.imgUrl = args.url;
				}); // this is so stupid just do redux already

		this.setState();
	},

	onSetNotes: function(args) {
		this.state.persistentCharacters
				.filter((pc) => charUtils.idsMatch(pc, args.who))
				.forEach((pc) => {
					pc.notes = args.notes;
				}); // this is so stupid just do redux already

		this.setState();
	},


	// Persistence /////////////////////////////////////////////////////////////////////////////////////////////////////

	onSave: function() {
		const pcData = {
			version: 1,
			persistentCharacters: [...this.state.persistentCharacters].sort((a, b) => a.id - b.id),
		};
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pcData));
		console.debug("Saved:", pcData);
		alert("Your characters are saved to this browser's local storage.");

		gaEvent('persistent-characters', 'pcs-save', undefined, this.state.persistentCharacters.length);
	},

	onLoad: function() {
		const pcJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!pcJSON) return;

		console.debug("Loaded:", pcJSON);
		const pcData = JSON.parse( pcJSON );
		if (pcData.version !== 1) {
			throw new Error("Loading failed; version mismatch: " + pcData.version);
		}

		const persistentCharacters = pcData.persistentCharacters || [];
		const nextId = (persistentCharacters && persistentCharacters.length > 0)
				? Math.max( ...(persistentCharacters.map((pc) => pc.id)) ) + 1
				: 0;
		this.replaceState({
			persistentCharacters,
			nextId,
		});

		gaEvent('persistent-characters', 'pcs-load', undefined, persistentCharacters.length);
	},

	loadDuringStartup: function() {
		const pcJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (pcJSON) {
			console.debug("Loaded:", pcJSON);
			var pcData = JSON.parse( pcJSON );
			if (pcData.version !== 1) {
				throw new Error("Loading failed; version mismatch: " + pcData.version);
			}
		} else {
			console.log("Loading defaults");
			pcData = DEFAULT_PERSISTENT_CHARACTERS;
			gaEvent('startup', 'startup-defaults', {nonInteraction: true});
		}

		const persistentCharacters = pcData.persistentCharacters || [];
		const nextId = (persistentCharacters && persistentCharacters.length > 0)
				? Math.max( ...(persistentCharacters.map((pc) => pc.id)) ) + 1
				: 0;
		this.replaceState({
			persistentCharacters,
			nextId,
		});


		if (pcJSON) {
			gaEvent('startup', 'startup-load', undefined, persistentCharacters.length, {nonInteraction: true});
		}
	},
};
