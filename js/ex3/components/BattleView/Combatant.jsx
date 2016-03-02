"use strict";

import React from 'react/react';
import Timing from './Timing';

import battleActions from 'ex3/actions/BattleActions';
import combatantShape from 'ex3/shapes/Combatant';

require('./Combatant.less');


export default React.createClass({

	propTypes: combatantShape.isRequired,

	render: function() {
		const p = this.props;

		return (
			<div className={`Combatant ${this.props.isInBattle ? '' : 'notInBattle'}`}>
				<Timing {...p} />
				<div className="portrait" style={{ backgroundImage: `url(${p.imgUrl});` }} />
				<div className="otherStuff">
					<div className="name">{p.name}</div>
					{ this._renderExitButton() }
				</div>
			</div>
		);
	},

	_renderExitButton: function() {
		if (!this.props.isInBattle) return null;

		return (
			<button className="btn btn-xs btn-warning" onClick={this._exitOnClick}>
				Exit from battle
			</button>
		);
	},

	_exitOnClick: function() {
		battleActions.exitBattle({
			who: this.props.id,
		});
	},
});
