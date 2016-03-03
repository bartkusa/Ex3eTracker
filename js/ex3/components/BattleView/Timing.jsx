"use strict";

import React from 'react/react';

import battleActions from 'ex3/actions/BattleActions';
import combatantShape from 'ex3/shapes/Combatant';
import * as TurnStatus from 'ex3/TurnStatus';
import { DEFAULT_INIT } from 'ex3/stores/BattleStore';

require('./Timing.less');


export default React.createClass({

	propTypes: combatantShape.isRequired,

	render: function() {
		const p = this.props;

		return (
			<div className="Timing">
				<select className="initiative"
						onChange={this._initiativeOnChange}
						required="true"
						value={p.initiative}
						>
					{ this._renderInitiativeOptions() }
				</select>
				<div>
					<i>Initiative</i>
				</div>

				{ this._renderButtons() }
			</div>
		);
	},

	_renderInitiativeOptions: function() {
		const cur = this.props.initiative;
		const max = Math.max(cur + 20, DEFAULT_INIT + 2);
		const min = Math.min(cur - 20, 0);

		const optionValues = Array.from( {length: max-min+1}, (x,i) => max-i );
		return optionValues.map((i) => (
			<option value={i}>
				{  (i < 0)  ?  (Math.abs(i)+'-')  :  i  }
			</option>
		));
	},

	_renderButtons: function() {
		if (!this.props.isInBattle) return;

		if (this.props.turnStatus === TurnStatus.CAN_GO) {
			return (
				<button className="btn btn-sm btn-default" onClick={this._startTurnOnClick}>
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

	_initiativeOnChange: function(e) {
		battleActions.setInit({
			who: this.props.id,
			initiative: +e.target.value, // "+" can convert strings to numbers
		})
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

				