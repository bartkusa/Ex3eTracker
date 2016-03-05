"use strict";

import React from 'react/react';
import Timing from './Timing';
import Portrait from 'ex3/components/Portrait';

import battleActions from 'ex3/actions/BattleActions';
import combatantShape from 'ex3/shapes/Combatant';
import { DEFAULT_IMAGE_URL } from 'ex3/stores/PersistentCharacters';

require('./Combatant.less');


export default React.createClass({

	propTypes: {
		combatant: combatantShape.isRequired,
		tick: React.PropTypes.number,
	},

	render: function() {
		const c = this.props.combatant;

		return (
			<div className={`Combatant ${c.isInBattle ? '' : 'notInBattle'}`}>
				<Timing combatant={c} tick={this.props.tick} />
				<Portrait imgUrl={c.imgUrl} />
				<div className="otherStuff">
					<div className="clearfix">
						<span className="name">{c.name}</span>
						{ this._renderExitButton() }
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

	_renderExitButton: function() {
		if (!this.props.combatant.isInBattle) return null;

		return (
			<div style={{float: "right"}}>
				<button className="btn btn-xs btn-warning" onClick={this._exitOnClick}>
					Exit battle
				</button>
			</div>
		);
	},

	_exitOnClick: function() {
		battleActions.exitBattle({
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
