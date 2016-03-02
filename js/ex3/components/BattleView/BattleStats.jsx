"use strict";

import React from 'react/react';


export default React.createClass({

	propTypes: {
		round: React.PropTypes.number.isRequired,
		tick:  React.PropTypes.number.isRequired,
	},

	render: function() {
		const p = this.props;

		return (
			<div className="BattleStats">
				Round {p.round}
				<br />
				Tick {p.tick}
			</div>
		);
	},

});
