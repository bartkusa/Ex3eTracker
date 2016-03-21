"use strict";

import * as battleActions from 'ex3/actions/BattleActions';
import { setState, replaceState } from './storeUtils';
import gaEvent from 'ex3/funcs/ga';

import { toIdSet, idsMatch } from './CharUtils';
import { asArray, mix } from 'ex3/funcs/utils';
import { byIncappedLast_WentFirst_InitDesc } from 'ex3/funcs/CombatantComparators';

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
		this.sort().trigger();

		gaEvent('battle', 'join-battle', undefined, persistentChars.length);
	},

	onEndBattle: function() {
		this.replaceState(null);
		gaEvent('battle', 'end');
	},

	onEnterBattle: function(action) {
		const newChallengers = (action && action.who && asArray(action.who)) || [];
		this.setState({
			combatants: [
				...this.state.combatants,
				...newChallengers.map(makeCombatant),
			],
		});
		this.sort().trigger();
	},

	onExitBattle: function(action) {
		const charIdsExitingBattle = toIdSet(action.who);
		this.state.combatants
			.filter((ch) => charIdsExitingBattle[ch.id])
			.forEach((ch) => {
				ch.isInBattle = false;
				ch.turnStatus = HAS_GONE
			});

		this.sort().setState();
		gaEvent('battle', 'combatant-exit');
	},

	onRemoveEntirely: function(action) {
		const charIdsExitingBattle = toIdSet(action.who);
		this.state.combatants = this.state.combatants.filter((ch) => !charIdsExitingBattle[ch.id]);

		this.sort().setState();
		gaEvent('battle', 'combatant-remove');
	},


	// Flow of time ////////////////////////////////////////////////////////////////////////////////////////////////////

	onNextRound: function() {
		const activeCombatants = this.state.combatants.filter((c) => c.isInBattle);
		activeCombatants.forEach((c) => {
			c.turnStatus = CAN_GO;
		});

		this.sort().setState({
			round: this.state.round + 1,
			tick: activeCombatants.length > 0
					? Math.max( ...activeCombatants.map((ac) => ac.initiative) )
					: 0,
		});
		gaEvent('battle', 'next-round', undefined, this.state.round);
	},

	onSetInit: function(action) {
		this.state.combatants
			.filter((c) => c.id === action.who)
			.forEach((c) => c.initiative = +action.initiative);

		this.setState(); // don't sort. leads to characters jumping around too much.
	},

	onSortCombatants: function() {
		this.sort().setState();
	},

	onStartTurn: function(action) {
		this.state.combatants
			.filter((c) => c.id === action.who) // TODO: fix these shitty semantics
			.forEach((c) => c.turnStatus = IS_GOING);

		this.setState();
		gaEvent('battle', 'combatant-start-turn', undefined, action.initiative);
	},

	onEndTurn: function(action) {
		this.state.combatants
			.filter((c) => c.id === action.who) // TODO: fix these shitty semantics
			.forEach((c) => c.turnStatus = HAS_GONE);

		const whoHasntGoneYet = this.state.combatants
			.filter((c) => c.isInBattle && c.turnStatus !== HAS_GONE);
		const highestInitThatHasntGone = (whoHasntGoneYet.length > 0)
				? Math.max( ...whoHasntGoneYet.map((c) => c.initiative) )
				: this.state.tick;

		this.sort().setState({
			tick: Math.min(this.state.tick, highestInitThatHasntGone),
		});

		gaEvent('battle', 'combatant-end-turn', undefined, action.initiative);
	},

	onResetTurn: function(action) {
		this.state.combatants
			.filter((c) => c.id === action.who) // TODO: fix these shitty semantics
			.forEach((c) => c.turnStatus = CAN_GO);

		this.sort().setState();

		gaEvent('battle', 'combatant-reset-turn', undefined, action.initiative);
	},

	sort: function() {
		this.state.combatants.sort( byIncappedLast_WentFirst_InitDesc );
		return this;
	},


	// Combatant mutation //////////////////////////////////////////////////////////////////////////////////////////////

	onSetNotes: function(action) {
		this.state.combatants
			.filter((c) => c.id === action.who) // TODO: fix these shitty semantics
			.forEach((c) => c.notes = action.notes);

		this.setState();
	},

};


// Handling combatants /////////////////////////////////////////////////////////////////////////////////////////////

function makeCombatant(persistentCharacter) {
	return mix( // this shallow-copy shit is going to ruin me one day
		persistentCharacter,
		{
			isInBattle: true,
			initiative: DEFAULT_INIT,
			turnStatus: CAN_GO,
		}
	);
};
