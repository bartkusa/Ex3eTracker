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
			characters: persistentChars.map(makeCombatant),
		});
	},

	onEndBattle: function() {
		this.replaceState(null);
	},

	onEnterBattle: function(action) {
		const newChallengers = (action && action.who && asArray(action.who)) || [];
		this.setState({
			characters: [
				...this.state.characters,
				...newChallengers.map(makeCombatant),
			],
		});
	},

	onExitBattle: function(action) {
		const charIdsExitingBattle = toIdSet(action.who);
		this.state.characters
			.filter((ch) => charIdsExitingBattle[ch.id])
			.forEach((ch) => ch.isInBattle = false)
			;

		this.setState();
	},


	// Flow of time ////////////////////////////////////////////////////////////////////////////////////////////////////

	onNextTick: function() {
		// ???
	},

	onNextRound: function() {
		// assert(everybody has gone)
		// check end-of-round stuff
		// set round++
		// set ticks to highest init of all people/events
		// check beginning-of-round stuff
	},


	// People doing their thing on their turn //////////////////////////////////////////////////////////////////////////

	onSetInit: function(action) {
		this.state.characters
			.filter((ch) => ch.id === action.who) // TODO: fix these shitty semantics
			.forEach((ch) => ch.initiative = action.initiative);

		this.setState();
	},

	onSetTurn: function() {
		this.state.characters
			.filter((ch) => ch.id === action.who) // TODO: fix these shitty semantics
			.forEach((ch) => ch.turnStatus = action.turnStatus);

		this.setState();
	},

};


// Handling combatants /////////////////////////////////////////////////////////////////////////////////////////////

function makeCombatant(persistentCharacter, ...otherTraits) {
	return mix(
		persistentCharacter,
		{
			initiative: DEFAULT_INIT,
			turnStatus: CAN_GO,
			isInBattle: true,
		},
		...otherTraits
	);
};
