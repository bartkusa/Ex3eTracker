"use strict";

import * as charUtils from './CharUtils';
// import deepFreeze from 'deep-freeze';

import * as battleActions from 'ex3/actions/BattleActions';

export const LOCAL_STORAGE_KEY = "savedPersistentCharacters";
export const DEFAULT_IMAGE_URL = "/ex/img/charDefault.jpg";


export default {

	listenables: battleActions,
	persistentCharacterStore: null,

	init: function() {
		this.replaceState(null);
	},

	setState: function(partialNewState) {
		this.replaceState( partialNewState ); // TODO: merge partialNew into this.state?
	},

	replaceState: function(totalNewState) {
		this.trigger( this.state = totalNewState ); // assign AND pass to trigger
	},


	// Persistence /////////////////////////////////////////////////////////////////////////////////////////////////////

	beginBattle: function({ persistentCharacters }) {
		return {
			round: 0,
			tick: 0,
			characters: null,
		};
	},

};
