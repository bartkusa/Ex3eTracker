"use strict";

import React from 'react/react';

import battleActions from 'ex3/actions/BattleActions';
import combatantShape from 'ex3/shapes/Combatant';
import * as TurnStatus from 'ex3/TurnStatus';

require('./Timing.less');


export default React.createClass({

	propTypes: combatantShape.isRequired,

	render: function() {
		const p = this.props;

		return (
			<div className="Timing">
				<div className="init">
					{p.initiative}
				</div>
				<div>
					<i>Init</i>
				</div>

				{ this._renderButtons() }
			</div>
		);
	},

	_renderButtons: function() {
		if (!this.props.isInBattle) return;

		if (this.props.turnStatus === TurnStatus.CAN_GO) {
			return (
				<button className="btn btn-sm btn-success" onClick={this._startTurnOnClick}>
					Go
				</button>
			);
		}

		if (this.props.turnStatus === TurnStatus.IS_GOING) {
			return [
				<button className="btn btn-sm btn-success" onClick={this._endTurnOnClick}>
					Done
				</button>,
				<button className="btn btn-xs btn-danger" onClick={this._abortTurnOnClick}>
					Abort
				</button>
			];
		}
	},

	_startTurnOnClick: function() {
		battleActions.startTurn({
			who: this.props.id,
		});
	},

	_endTurnOnClick: function() {
		battleActions.endTurn({
			who: this.props.id,
		});
	},

	_abortTurnOnClick: function() {
		battleActions.resetTurn({
			who: this.props.id,
		});
	},
});

				