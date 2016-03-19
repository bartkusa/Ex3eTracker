import React from 'react/react';

require('./DeltaNum.less');


export default ((p) => {

	// propTypes: {
	// 	delta: React.PropTypes.number,
	// 	direction: React.PropTypes.oneOf(['up', 'down', 'cur']),
	// 	opacity: React.PropTypes.number,
	//	radians: React.PropTypes.number,
	// 	radius: React.PropTypes.number,
	// },

	const x = p.radius * Math.cos(p.radians);
	const y = p.radius * Math.sin(p.radians);

	return (
		<div className={`DeltaNum ${p.direction}`}
				style={{
					transform: `translate3D(${truncate(x)}px, ${truncate(y)}px, 0)`,
					// opacity: Math.round(p.opacity * 100)/100, // weird, Chrome won't rerender this sometimes if opacity is applied
				}}>
			{p.delta >= 0 ? '+' : ''}
			{p.delta}
		</div>
	);

});

function truncate(num) {
	return Math.round(num * 10e4) / 10e4;
};
