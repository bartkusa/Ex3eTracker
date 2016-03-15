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

		return (
			<div className="BattleView clearfix">
				<div className="bvHeader clearfix">
					<h1>Battle View</h1>
					<div className="topRight">
						{ this._renderButtons() }
						<BattleStats {...p} />
					</div>
				</div>

				{this._renderCharList()}
			</div>
		);
	},

	_renderButtons: function() {
		const p = this.props;

		const nobodyCanGo =  p.combatants.every((c) => !c.isInBattle || c.turnStatus === HAS_GONE);
		const gameOver = nobodyCanGo && p.combatants.every((c) => !c.isInBattle);

		const nextRoundButtonClass = (nobodyCanGo && !gameOver) ? 'btn-primary' : 'btn-default';
		const endBattleButtonClass = gameOver ? 'btn-primary' : 'btn-danger';

		return [
			<button className={`btn btn-lg ${endBattleButtonClass}`}
					key="end"
					onClick={this._endBattleOnClick}
					>
				End Battle
			</button>,
			<button className={`btn btn-lg ${nextRoundButtonClass}`}
					disabled={gameOver}
					key="next"
					onClick={this._nextRoundOnClick}
					>
				Next Round
			</button>
		];
	},

	_renderCharList: function() {
		if (!this.props.combatants || this.props.combatants.size <= 0) return null;
		const isAnybodyGoing = this.props.combatants.some((c) => c.turnStatus === IS_GOING);

		const makeLiWrappedComponent = (c) => (
			<li key={c.id}>
				<Combatant
						combatant={c}
						isAnybodyGoing={isAnybodyGoing}
						round={this.props.round}
						tick={this.props.tick}
						/>
			</li>
		);
		const contents = [
			...this.props.combatants.filter((c) =>  c.isInBattle).map(makeLiWrappedComponent),
			(
				<li key="nextButton" className="clearfix">
					<span style={{
						float: "right",
						clear: "both",
					}}>
						{ this._renderNextRoundButton() }
					</span>
				</li>
			),
			...this.props.combatants.filter((c) => !c.isInBattle).map(makeLiWrappedComponent),
		];

		return (
			<div className="combatants semanticList">
				<FlipMove
						duration={300}
						easing="cubic-bezier(0.25, 0.1, 0.25, 1)"
						staggerDelayBy={20}
						staggerDurationBy={15}
						typeName="ol"
						>
					{contents}
				</FlipMove>
			</div>
		);
	},

	_renderNextRoundButton: function() {
		const p = this.props;

		const nobodyCanGo =  p.combatants.every((c) => !c.isInBattle || c.turnStatus === HAS_GONE);
		const gameOver = nobodyCanGo && p.combatants.every((c) => !c.isInBattle);

		const nextRoundButtonClass = (nobodyCanGo && !gameOver) ? 'btn-primary' : 'btn-default';

		return (
			<button className={`btn btn-lg ${nextRoundButtonClass}`}
					disabled={gameOver}
					onClick={this._nextRoundOnClick}
					>
				Next Round
			</button>
		);
	},

	_endBattleOnClick: function() {
		battleActions.endBattle();
	},

	_nextRoundOnClick: function() {
		battleActions.nextRound();
	},
});
