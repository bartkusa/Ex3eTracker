"use strict";

import React from 'react/react';
import BattleStats from './BattleView/BattleStats';

import battleActions from 'ex3/actions/BattleActions';
import BattleShape from 'ex3/shapes/Battle';

require('./BattleView.less');


export default React.createClass({

	propTypes: BattleShape.isRequired,

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
		return this.props.combatants.map( (c, i) => (
			<div key={i}>{ JSON.stringify(c) }</div>
		));
	},
});
