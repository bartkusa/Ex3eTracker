"use strict";

import React from 'react/react';
import BattleStats from './BattleView/BattleStats';
import Combatant from './BattleView/Combatant';

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
			<ul className="combatants semanticList">
				{this.props.combatants.map((c) => (
					<li key={c.id}>
						<Combatant {...c} />
					</li>
				)) }
			</ul>
		);
	},
});
