"use strict";

import React from 'react/react';
import BattleStats from './BattleView/BattleStats';
import Combatant from './BattleView/Combatant';
import FlipMove from 'react-flip-move';

import battleActions from 'ex3/actions/BattleActions';
import battleShape from 'ex3/shapes/Battle';
import { CAN_GO, IS_GOING, HAS_GONE } from 'ex3/TurnStatus';

require('./BattleView.less');
require('style/semanticList.less')

export default React.createClass({

	propTypes: battleShape.isRequired,

	render: function() {
		const p = this.props;
		const nobodyCanGo = p.combatants.every((c) => !c.isInBattle || c.turnStatus === HAS_GONE);
		const nextRoundButtonClass = nobodyCanGo ? 'btn-primary' : 'btn-default';

		return (
			<div className="BattleView clearfix">
				<div className="bvHeader clearfix">
					<h1>Battle View</h1>
					<div className="topRight">
						<button className={`btn btn-lg ${nextRoundButtonClass}`}
								onClick={this._nextRoundOnClick}
								>
							Next Round
						</button>
						<BattleStats {...p} />
					</div>
				</div>

				{this._renderCharList()}
			</div>
		);
	},

	_renderCharList: function() {
		if (!this.props.combatants || this.props.combatants.size <= 0) return null;

		return (
			<div className="combatants semanticList">
				<FlipMove
						duration={300}
						easing="cubic-bezier(0.25, 0.1, 0.25, 1)"
						staggerDelayBy={20}
						staggerDurationBy={15}
						typeName="ol"
						>
					{this.props.combatants.map((c) => (
						<li key={c.id}>
							<Combatant {...c} />
						</li>
					)) }
				</FlipMove>
			</div>
		);
	},

	_nextRoundOnClick: function() {
		battleActions.nextRound();
	},
});
