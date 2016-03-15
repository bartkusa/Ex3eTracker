import React from 'react/react';
import knobActions from 'ex3/actions/KnobActions';

require('./Overlay.less');


export default React.createClass({

	render: function() {
		return (
			<div {...this.props}
					className={`Overlay ${this.props.className || ""}`}
					>
				{this.props.children}
			</div>
		);
	},

});
