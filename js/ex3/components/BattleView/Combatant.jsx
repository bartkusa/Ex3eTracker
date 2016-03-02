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
				<div className="init">
					{p.initiative}
				</div>
				<div className="portrait" style={{ backgroundImage: `url(${p.imgUrl});` }} />
				<div className="otherStuff">
					<div className="name">{p.name}</div>
				</div>
			</div>
		);
	},
});
