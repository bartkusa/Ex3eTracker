"use strict";

import gaEvent from 'ex3/funcs/ga';
import makeKnobHandlers from 'ex3/funcs/knobHandlers';

import React from 'react/react';
import IntegerSelect from 'ex3/components/IntegerSelect';

import battleActions from 'ex3/actions/BattleActions';
import combatantShape from 'ex3/shapes/Combatant';
import * as TurnStatus from 'ex3/TurnStatus';
import { DEFAULT_INIT } from 'ex3/stores/BattleStore';

require('./Timing.less');
require('style/centeredInputBlock.less');
require('style/noLongPress.less');

const INITIATIVE_RANGE = 15; // For initiative, render options from current+range to current-range, modulo weirdness.


export default React.createClass({

	_tapTimeout: null,

	propTypes: {
		className: React.PropTypes.string,
		combatant: combatantShape.isRequired,
		tick: React.PropTypes.number,
	},

	render: function() {
		const classNames = `Timing centeredInputBlock noLongPress ${this.props.className || ''}`;

		const c = this.props.combatant;
		if (!c.isInBattle) return <div className={classNames}></div>;

		return (
			<div className={classNames}>
				<div {...makeKnobHandlers(c.initiative, this._initiativeOnChange)}
						onWheel={ this._initiativeOnWheel }
						>
					<IntegerSelect
							className="big"
							min={ Math.min(c.initiative - INITIATIVE_RANGE, 0) }
							max={ Math.max(c.initiative + INITIATIVE_RANGE, DEFAULT_INIT + 2) }
							onChange={this._initiativeOnChange}
							onWheelIncrement={this._initiativeOnWheelIncrement}
							required="true"
							value={c.initiative}
							/>
					<div>
						<i>Initiative</i>
					</div>
				</div>

				{ this._renderButtons() }
			</div>
		);
	},

	_renderButtons: function() {
		const c = this.props.combatant;
		if (!c.isInBattle) return;

		if (c.turnStatus === TurnStatus.CAN_GO) {
			const buttonClass = (c.initiative >= this.props.tick) ? 'btn-primary' : 'btn-default';
			return (
				<button className={`btn btn-sm ${buttonClass}`} onClick={this._endTurnOnClick}>
					Go
				</button>
			);
		}

		// if (c.turnStatus === TurnStatus.IS_GOING) {
		// 	return [
		// 		<button className="btn btn-sm btn-success" key="done" onClick={this._endTurnOnClick}>
		// 			Done
		// 		</button>,
		// 		<button className="btn btn-xs btn-danger" key="abort" onClick={this._abortTurnOnClick}>
		// 			Abort
		// 		</button>
		// 	];
		// }
	},

	_endTurnOnClick: function() {
		battleActions.startTurn({
			who: this.props.combatant.id,
		});
		battleActions.endTurn({
			who: this.props.combatant.id,
		});
	},

	// _startTurnOnClick: function() {
	// 	// There's no reason to support "aborted turns" until there's some undo functionality built in.
	// 	battleActions.startTurn({
	// 	 	who: this.props.combatant.id,
	// 	});
	// },

	// _abortTurnOnClick: function() {
	// 	battleActions.resetTurn({
	// 		who: this.props.combatant.id,
	// 	});
	// },

	_initiativeOnChange: function(newValue) {
		battleActions.setInit({
			who: this.props.combatant.id,
			initiative: newValue,
		});
		gaEvent('battle', 'combatant-init', undefined, newValue - this.props.combatant.initiative);
	},

	_initiativeOnWheelIncrement: function(direction) {
		battleActions.setInit({
			who: this.props.combatant.id,
			initiative: this.props.combatant.initiative + ((direction < 0) ? -1 : 1),
		});
		gaEvent('battle', 'combatant-init-mousewheel');
	},
});
