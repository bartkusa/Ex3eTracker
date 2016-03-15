import React from 'react/react';
import Overlay from './Overlay';

import knobActions from 'ex3/actions/KnobActions';
import KnobShape from 'ex3/shapes/KnobShape';

require('./Knob.less');


export default React.createClass({

	propTypes: KnobShape,

	render: function() {
		return (
			<Overlay className="Knob"
					onTouchMove={this._onTouchMove}
					onTouchEnd={knobActions.commit}
					>
				<div className="curValue">{this.props.value}</div>
				<div className={`abort ${this.props.isOverAbortSector ? "hover" : ""}`}>
					Cancel
				</div>
			</Overlay>
		);
	},

	_onTouchMove: function(e) {
		e.preventDefault();
		knobActions.update({ touch: e.touches[0] });
	},

});
