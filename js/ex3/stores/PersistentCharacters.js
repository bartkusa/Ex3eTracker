"use strict";

import * as charActions from 'ex3/actions/CharActions';
import * as charUtils from './CharUtils';
import { setState, replaceState } from './storeUtils';

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


	// Persistence /////////////////////////////////////////////////////////////////////////////////////////////////////

	onSave: function() {
		const pcData = {
			version: 1,
			persistentCharacters: this.state.persistentCharacters,
		};
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pcData));
		console.debug("Saved:", pcData);
		alert("Your stuff is saved");
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
			persistentCharacters: [...this.state.persistentCharacters, ...newPCs],
		});
	},

	onRemove: function(input) {
		const idsToPurge = charUtils.toIds(input);
		const purgedPCs = this.state.persistentCharacters
				.filter( (pc) => idsToPurge.indexOf(pc.id) < 0 );

		this.setState({
			nextId: this.state.nextId,
			persistentCharacters: purgedPCs,
		});
	},


	// Mutations ///////////////////////////////////////////////////////////////////////////////////////////////////////

	onSetName: function(args) {
		this.state.persistentCharacters
				.filter((pc) => charUtils.idsMatch(pc, args.who))
				.forEach((pc) => {
					pc.name = args.name || "";
				}); // this is so stupid just do redux already

		this.setState( this.state );
	},

	onSetPortrait: function(args) {
		this.state.persistentCharacters
				.filter((pc) => charUtils.idsMatch(pc, args.who))
				.forEach((pc) => {
					pc.imgUrl = args.url || DEFAULT_IMAGE_URL;
				}); // this is so stupid just do redux already

		this.setState( this.state );
	},
};
