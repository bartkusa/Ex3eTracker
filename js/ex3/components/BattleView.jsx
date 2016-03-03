"use strict";

import React from 'react/react';
import BattleStats from './BattleView/BattleStats';
import Combatant from './BattleView/Combatant';
import FlipMove from 'react-flip-move';

import battleActions from 'ex3/actions/BattleActions';
import battleShape from 'ex3/shapes/Battle';

require('./BattleView.less');
require('style/semanticList.less')

export default React.createClass({

	propTypes: battleShape.isRequired,

	render: function() {
		const p = this.props;

		return (
			<div className="BattleView clearfix">
				<span className="clearfix">
					<h1>Battle View</h1>
					<BattleStats {...p} />
				</span>

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
});
