import React from 'react/react';
import knobActions from 'ex3/actions/KnobActions';

require('./Overlay.less');


export default React.createClass({

	render: function() {
		return (
			<div className="Overlay"
					onTouchMove={this._onTouchMove}
					onTouchEnd={knobActions.commit}
					>
				{this.props.children}
			</div>
		);
	},

	_onTouchMove: function(e) {
		e.preventDefault();
		knobActions.update({
			touch: e.touches[0],
		});
	},

});
