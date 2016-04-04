"use strict";

import * as charActions from 'ex3/actions/CharActions';
import * as charUtils from './CharUtils';
import { setState, replaceState } from './storeUtils';
import gaEvent from 'ex3/funcs/ga';

const  DEFAULT_PERSISTENT_CHARACTERS = require('ex3/data/DefaultPersistentCharacters');

export const LOCAL_STORAGE_KEY = "savedPersistentCharacters";
export const DEFAULT_IMAGE_URL = "./img/charDefault.jpg"; // TODO: Define image root location

const UNSAVED_CHANGES_WARNING = "Your character roster has unsaved changes, which will be lost if you leave.";
const CUR_CHARACTER_VERSION = 2;


export default {

	listenables: charActions,

	setState,
	replaceState,

	init: function() {
		this.replaceState({
			nextId: 0,
			persistentCharacters: [], // should this be a map of id->obj?
			areUnsavedChanges: false,
		});

		window.addEventListener("beforeunload", (e) => {
			if (this.state.areUnsavedChanges) {
				return (e || window.event).returnValue = UNSAVED_CHANGES_WARNING;
			}
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
			if (newPC.personalEss == null) newPC.personalEss   = 13;  // Default values for solars
			if (newPC.peripheral == null)  newPC.peripheralEss = 33;
		});

		this.setState({
			nextId: nextId,
			persistentCharacters: [...newPCs, ...this.state.persistentCharacters],
			areUnsavedChanges: true,
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
			areUnsavedChanges: true,
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

		this.setState({ areUnsavedChanges: true });
	},

	onSetPortrait: function(args) {
		this.state.persistentCharacters
				.filter((pc) => charUtils.idsMatch(pc, args.who))
				.forEach((pc) => {
					pc.imgUrl = args.url;
				}); // this is so stupid just do redux already

		this.setState({ areUnsavedChanges: true });
	},

	onSetPortraitCenter: function({who, imgPosX, imgPosY}) {
		this.state.persistentCharacters
				.filter(pc => charUtils.idsMatch(pc, who))
				.forEach(pc => {
					if (imgPosX) pc.imgPosX = imgPosX;
					if (imgPosY) pc.imgPosY = imgPosY;
				});

		this.setState({ areUnsavedChanges: true });
	},

	onSetNotes: function(args) {
		this.state.persistentCharacters
				.filter((pc) => charUtils.idsMatch(pc, args.who))
				.forEach((pc) => {
					pc.notes = args.notes;
				}); // this is so stupid just do redux already

		this.setState({ areUnsavedChanges: true });
	},

	onSetEssence: function({who, personal, peripheral}) {
		this.state.persistentCharacters
				.filter((pc) => charUtils.idsMatch(pc, who))
				.forEach((pc) => {
					if (personal != null)   pc.personalEss   = Math.max(0, personal);
					if (peripheral != null) pc.peripheralEss = Math.max(0, peripheral);
				}); // this is so stupid just do redux already

		this.setState({ areUnsavedChanges: true });
	},


	// Persistence /////////////////////////////////////////////////////////////////////////////////////////////////////

	onSave: function() {
		const pcData = {
			version: 2,
			persistentCharacters: [...this.state.persistentCharacters].sort((a, b) => a.id - b.id),
		};
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pcData));
		console.debug("Saved:", pcData);
		alert("Your characters are saved to this browser's local storage.");

		this.setState({ areUnsavedChanges: false });

		gaEvent('persistent-characters', 'pcs-save', undefined, this.state.persistentCharacters.length);
	},

	onLoad: function() {
		const pcJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (!pcJSON) {
			this.setState({ areUnsavedChanges: false });
			return;
		}

		console.debug("Loaded:", pcJSON);
		const pcData = JSON.parse( pcJSON );
		if (pcData.version !== CUR_CHARACTER_VERSION) {
			throw new Error("Loading failed; version mismatch: " + pcData.version);
		}

		const persistentCharacters = pcData.persistentCharacters || [];
		const nextId = (persistentCharacters && persistentCharacters.length > 0)
				? Math.max( ...(persistentCharacters.map((pc) => pc.id)) ) + 1
				: 0;
		this.replaceState({
			persistentCharacters,
			nextId,
			areUnsavedChanges: false,
		});

		gaEvent('persistent-characters', 'pcs-load', undefined, persistentCharacters.length);
	},

	loadDuringStartup: function() {
		const pcJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (pcJSON) {
			console.debug("Loaded:", pcJSON);
			var pcData = upgradeData( JSON.parse( pcJSON ) );
		} else {
			console.log("Loading defaults");
			pcData = DEFAULT_PERSISTENT_CHARACTERS;
			gaEvent('startup', 'startup-defaults', 'v' + CUR_CHARACTER_VERSION, {nonInteraction: true});
		}

		const persistentCharacters = pcData.persistentCharacters || [];
		const nextId = (persistentCharacters && persistentCharacters.length > 0)
				? Math.max( ...(persistentCharacters.map((pc) => pc.id)) ) + 1
				: 0;
		this.replaceState({
			persistentCharacters,
			nextId,
			areUnsavedChanges: false,
		});


		if (pcJSON) {
			gaEvent('startup', 'startup-load', 'v' + pcData.version, persistentCharacters.length, {nonInteraction: true});
		}
	},
};


function upgradeData(pcData) {
	switch(pcData.version) {
		case CUR_CHARACTER_VERSION:
			return pcData;
		case 1:
			return convertFromV1toV2(pcData);
		default:
			gaEvent('startup', 'startup-version-error', 'v' + pcData.version);
			throw new Error("Loading failed; version mismatch: " + pcData.version);
	}
};

function convertFromV1toV2(pcData) {
	pcData.persistentCharacters
		.forEach(pc => {
			pc.personalEss = pc.peripheralEss = 0;
		});
	pcData.version = CUR_CHARACTER_VERSION;
	return pcData;
};
