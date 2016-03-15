"use strict";

import throttle from 'lodash/throttle';

import React from 'react/react';

import battleActions from 'ex3/actions/BattleActions';
import knobActions from 'ex3/actions/KnobActions';
import combatantShape from 'ex3/shapes/Combatant';
import * as TurnStatus from 'ex3/TurnStatus';
import { DEFAULT_INIT } from 'ex3/stores/BattleStore';

require('./Timing.less');

const MAX_MOUSEWHEELS_PER_SECOND = 6;
const TAP_MSEC = 350;


export default React.createClass({

	_tapTimeout: null,

	propTypes: {
		combatant: combatantShape.isRequired,
		tick: React.PropTypes.number,
	},

	componentWillUnmount: function() {},

	render: function() {
		const c = this.props.combatant;
		if (!c.isInBattle) return <div className="Timing"></div>;

		return (
			<div className="Timing" 
						onTouchStart={this._initiativeOnTouchStart}
						onTouchMove={this._initiativeOnTouchMove}
						onTouchEnd={this._initiativeOnTouchEnd}
						onWheel={this._initiativeOnWheel}
						>
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

	_initiativeOnTouchStart: function(e) {
		knobActions.start({
			touch: e.touches[0],
			value: this.props.combatant.initiative,
			callback: ((value) => {
				battleActions.setInit({
					who: this.props.combatant.id,
					initiative: value,
				})
			}),
		});

		this._clearTimeout();
		this._tapTimeout = setTimeout( this._clearTimeout, TAP_MSEC );
	},

	_initiativeOnTouchMove: function(e) {
		e.preventDefault();
		knobActions.update({ touch: e.touches[0] });
	},

	_initiativeOnTouchEnd: function(e) {
		if (this._tapTimeout) {
			this._clearTimeout();		// if touch ended before tap-time passed, just leave it up onscreen
		} else {
			knobActions.commit();
		}
	},

	_clearTimeout: function() {
		if (!this._tapTimeout) return;
		clearTimeout( this._tapTimeout );
		this._tapTimeout = null;
	},

	_initiativeOnWheel: function(e) {
		if ((e.deltaY === 0) || Math.abs(e.deltaY) < Math.abs(e.deltaX) || Math.abs(e.deltaY) < Math.abs(e.deltaZ)) return;

		e.preventDefault();
		battleActions.setInit({
			who: this.props.combatant.id,
			initiative: this.props.combatant.initiative + ((e.deltaY < 0) ? 1 : -1),
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


const throttledSetInit = throttle(
	(action) => battleActions.setInit(action),
	(1000 / MAX_MOUSEWHEELS_PER_SECOND),
	{leading: true} );
