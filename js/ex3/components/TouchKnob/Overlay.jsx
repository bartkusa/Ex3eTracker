import React from 'react/react';

require('./Overlay.less');


export default React.createClass({

	render: function() {
		return (
			<div className="Overlay">
				{this.props.children}
			</div>
		);
	},

});
