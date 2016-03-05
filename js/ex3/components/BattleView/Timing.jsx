"use strict";

import React from 'react/react';

import battleActions from 'ex3/actions/BattleActions';
import combatantShape from 'ex3/shapes/Combatant';
import * as TurnStatus from 'ex3/TurnStatus';
import { DEFAULT_INIT } from 'ex3/stores/BattleStore';

require('./Timing.less');


export default React.createClass({

	propTypes: {
		combatant: combatantShape.isRequired,
		tick: React.PropTypes.number,
	},

	render: function() {
		const c = this.props.combatant;
		if (!c.isInBattle) return <div className="Timing"></div>;

		return (
			<div className="Timing">
				<select className="initiative"
						onChange={this._initiativeOnChange}
						required="true"
						value={c.initiative}
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
		const c = this.props.combatant;

		const cur = c.initiative;
		const max = Math.max(cur + 20, DEFAULT_INIT + 2);
		const min = Math.min(cur - 20, 0);

		const optionValues = Array.from( {length: max-min+1}, (x,i) => max-i );
		return optionValues.map((i) => (
			<option value={i} key={i}>
				{  (i < 0)  ?  (Math.abs(i)+'-')  :  i  }
			</option>
		));
	},

	_renderButtons: function() {
		const c = this.props.combatant;
		if (!c.isInBattle) return;

		if (c.turnStatus === TurnStatus.CAN_GO) {
			const buttonClass = (c.initiative >= this.props.tick) ? 'btn-primary' : 'btn-default';
			return (
				<button className={`btn btn-sm ${buttonClass}`} onClick={this._startTurnOnClick}>
					Go
				</button>
			);
		}

		if (c.turnStatus === TurnStatus.IS_GOING) {
			return [
				<button className="btn btn-sm btn-success" key="done" onClick={this._endTurnOnClick}>
					Done
				</button>,
				<button className="btn btn-xs btn-danger" key="abort" onClick={this._abortTurnOnClick}>
					Abort
				</button>
			];
		}
	},

	_initiativeOnChange: function(e) {
		battleActions.setInit({
			who: this.props.combatant.id,
			initiative: +e.target.value, // "+" can convert strings to numbers
		})
	},

	_startTurnOnClick: function() {
		battleActions.startTurn({
			who: this.props.combatant.id,
		});
	},

	_endTurnOnClick: function() {
		battleActions.endTurn({
			who: this.props.combatant.id,
		});
	},

	_abortTurnOnClick: function() {
		battleActions.resetTurn({
			who: this.props.combatant.id,
		});
	},
});