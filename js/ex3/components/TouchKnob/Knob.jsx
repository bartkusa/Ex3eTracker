import React from 'react/react';
import Overlay from './Overlay';
import DeltaNum from './DeltaNum';

import knobActions from 'ex3/actions/KnobActions';
import KnobShape from 'ex3/shapes/KnobShape';
import range from 'lodash/range';

require('./Knob.less');
require('style/noLongPress.less');

const RADIANS = Math.PI * 2;


export default React.createClass({

	// propTypes: KnobShape,

	render: function() {
		const {originalValue, value, sector, sectors} = this.props;
		const curDeltaNum = value - originalValue;
		const curDeltaStr = (curDeltaNum >= -0 ? "+" : "") + curDeltaNum;

		return (
			<Overlay className="Knob noLongPress"
					onTouchStart={this._onTouchStartOrMove}
					onTouchMove={this._onTouchStartOrMove}
					onTouchEnd={knobActions.commit}
					>
				<div className="curState">
					<span className="newValue">{ value }</span>
					{" "}&nbsp;{" "}
					<span className="delta">({ curDeltaStr })</span>
					
				</div>
				<div className={`abort ${this.props.isOverAbortSector ? "hover" : ""}`}
						onClick={ knobActions.abort }
						>
					Cancel
				</div>
				{ this._renderDeltas() }
			</Overlay>
		);
	},

	_renderDeltas: function() {
		const {originalValue, value, sector, sectors} = this.props;
		const curDiff = value - originalValue;

		const viewportRadius = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight) / 2;
		const deltaRadius = viewportRadius / 2;

		const sectorData = {};
		for (let i=0; 2*i <= sectors; i++) {
			sectorData[posMod(sector-i, sectors)] = {
				delta: curDiff - i,
				direction: (i > 0) ? 'down' : 'cur',
				// opacity: 1 - (i*2/sectors),
			};
			sectorData[posMod(sector+i, sectors)] = {
				delta: curDiff + i,
				direction: (i > 0) ? 'up' : 'cur',
				// opacity: 1 - (i*2/sectors),
			};
		}

		const sectorRadianSize = RADIANS / sectors;

		return range(0, sectors).map((s) => {
			const sectorDatum = sectorData[s];
			return (
				<DeltaNum key={'delta' + s}
						delta={sectorDatum.delta}
						direction={sectorDatum.direction}
						// opacity={sectorDatum.opacity}
						radians={sectorRadianSize * s}
						radius={deltaRadius}
						/>
			);
		});
	},

	_onTouchStartOrMove: function(e) {
		e.preventDefault();
		knobActions.update({ touch: e.touches[0] });
	},

});

function posMod(val, mod) {
	const moddedVal = val % mod;
	if (moddedVal < 0) return moddedVal + mod;
	return moddedVal;
};
