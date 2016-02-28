"use strict";

import * as battleActions from 'ex3/actions/BattleActions';
import * as charUtils from './CharUtils';
import { setState, replaceState } from './storeUtils';

export const LOCAL_STORAGE_KEY = "savedPersistentCharacters";
export const DEFAULT_IMAGE_URL = "/ex/img/charDefault.jpg";


export default {

	listenables: battleActions,
	persistentCharacterStore: null,

	setState,
	replaceState,

	init: function() {
		this.replaceState(null);
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
