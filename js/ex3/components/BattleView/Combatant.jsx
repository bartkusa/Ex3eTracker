"use strict";

import React from 'react/react';
import Timing from './Timing';
import Portrait from 'ex3/components/Portrait';

import { CAN_GO, IS_GOING, HAS_GONE } from 'ex3/TurnStatus';
import battleActions from 'ex3/actions/BattleActions';
import combatantShape from 'ex3/shapes/Combatant';
import { DEFAULT_IMAGE_URL } from 'ex3/stores/PersistentCharacters';

require('./Combatant.less');
require('style/screenSizes.less');


export default React.createClass({

	propTypes: {
		combatant: combatantShape.isRequired,
		isAnybodyGoing: React.PropTypes.bool,
		round: React.PropTypes.number,
		tick: React.PropTypes.number,
	},

	render: function() {
		const c = this.props.combatant;

		return (
			<div className={`Combatant ${c.isInBattle ? '' : 'notInBattle'} ${this._getZClassName()}`}>
				<Timing combatant={c} tick={this.props.tick} />
				<Portrait imgUrl={c.imgUrl} />
				<div className="otherStuff">
					<div className="clearfix">
						<span className="name">{c.name}</span>
						{ this._renderExitOrRemoveButton() }
					</div>
					<textarea
						className="notes"
						onChange={this._notesOnChange}
						placeholder="Ephemeral notes"
						rows="4"
						value={c.notes}
						/>
				</div>
			</div>
		);
	},

	_getZClassName: function() {
		const c = this.props.combatant;

		if (!c.isInBattle) return 'zFlat';
		if (c.turnStatus === HAS_GONE) return 'zLow';
		if (c.turnStatus === IS_GOING) return 'zHi';
		if (!this.props.isAnybodyGoing && c.initiative >= this.props.tick) return 'zHi';
		return 'zMed';
	},

	_renderExitOrRemoveButton: function() {
		if (!this.props.combatant.isInBattle) return null;

		if (this.props.round > 0) {
			return (
				<div style={{float: "right"}}>
					<button className="btn btn-xs btn-warning screenBigOnly" onClick={this._exitOnClick}>
						Exit battle
					</button>
					<button className="btn btn-xs btn-warning screenSmallOnly" onClick={this._exitOnClick}>
						X
					</button>
				</div>
			);
		}

		return (
			<div style={{float: "right"}}>
				<button className="btn btn-xs btn-warning screenBigOnly" onClick={this._removeOnClick}>
					Remove
				</button>
				<button className="btn btn-xs btn-warning screenSmallOnly" onClick={this._removeOnClick}>
					X
				</button>
			</div>
		);
	},

	_exitOnClick: function() {
		battleActions.exitBattle({
			who: this.props.combatant.id,
		});
	},

	_removeOnClick: function() {
		battleActions.removeEntirely({
			who: this.props.combatant.id,
		});
	},

	_notesOnChange: function(e) {
		battleActions.setNotes({
			who: this.props.combatant.id,
			notes: e.target.value,
		})
	},
});
