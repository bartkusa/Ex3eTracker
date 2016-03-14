import React from 'react/react';
import knobActions from 'ex3/actions/KnobActions';

require('./Overlay.less');


export default React.createClass({

	render: function() {
		return (
			<div className="Overlay" onTouchEnd={knobActions.end}>
				{this.props.children}
			</div>
		);
	},

});
