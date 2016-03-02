"use strict";

import React from 'react/react';

import battleActions from 'ex3/actions/BattleActions';
import combatantShape from 'ex3/shapes/Combatant';

require('./Combatant.less');


export default React.createClass({

	propTypes: combatantShape.isRequired,

	render: function() {
		const p = this.props;

		return (
			<div className="Combatant">
				{p.name}
			</div>
		);
	},
});
