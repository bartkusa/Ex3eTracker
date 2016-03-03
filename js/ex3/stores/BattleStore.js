"use strict";

import * as battleActions from 'ex3/actions/BattleActions';
import { toIdSet, idsMatch } from './CharUtils';
import { asArray, mix } from 'ex3/funcs/utils';
import { setState, replaceState } from './storeUtils';

import { CAN_GO, IS_GOING, HAS_GONE } from 'ex3/TurnStatus';

export const LOCAL_STORAGE_KEY = "savedPersistentCharacters";
export const DEFAULT_IMAGE_URL = "/ex/img/charDefault.jpg";
export const DEFAULT_INIT = 3;


export default {

	listenables: battleActions,
	persistentCharacterStore: null,

	setState,
	replaceState,

	init: function() {
		this.replaceState(null);
	},


	// Who's in? Who's out? ////////////////////////////////////////////////////////////////////////////////////////////

	onBeginBattle: function(action) {
		// TODO: Should action.who be an array of characters, or an array of persistent characters' IDs?
		const persistentChars = (action && action.who && asArray(action.who))
				|| this.persistentCharacterStore.state.persistentCharacters // TODO: This is a stupid hack, should probably just delete
				|| [];

		this.replaceState({
			round: 0,
			tick: 0,
			combatants: persistentChars.map(makeCombatant),
		});
	},

	onEndBattle: function() {
		this.replaceState(null);
	},

	onEnterBattle: function(action) {
		const newChallengers = (action && action.who && asArray(action.who)) || [];
		this.setState({
			combatants: [
				...this.state.combatants,
				...newChallengers.map(makeCombatant),
			],
		});
	},

	onExitBattle: function(action) {
		const charIdsExitingBattle = toIdSet(action.who);
		this.state.combatants
			.filter((ch) => charIdsExitingBattle[ch.id])
			.forEach((ch) => ch.isInBattle = false)
			;

		this.setState();
	},


	// Flow of time ////////////////////////////////////////////////////////////////////////////////////////////////////

	onSetInit: function(action) {
		this.state.combatants
			.filter((c) => c.id === action.who)
			.forEach((c) => c.initiative = +action.initiative);

		this.setState();
	},

	onStartTurn: function(action) {
		this.state.combatants
			.filter((c) => c.id === action.who) // TODO: fix these shitty semantics
			.forEach((c) => c.turnStatus = IS_GOING);

		this.setState();
	},

	onEndTurn: function(action) {
		this.state.combatants
			.filter((c) => c.id === action.who) // TODO: fix these shitty semantics
			.forEach((c) => c.turnStatus = HAS_GONE);

		this.setState();
	},

	onResetTurn: function(action) {
		this.state.combatants
			.filter((c) => c.id === action.who) // TODO: fix these shitty semantics
			.forEach((c) => c.turnStatus = CAN_GO);

		this.setState();
	},

};


// Handling combatants /////////////////////////////////////////////////////////////////////////////////////////////

function makeCombatant(persistentCharacter) {
	return mix(
		persistentCharacter,
		{
			isInBattle: true,
			initiative: DEFAULT_INIT,
			turnStatus: CAN_GO,
		}
	);
};
