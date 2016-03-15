import { PropTypes } from 'react/react';


export default PropTypes.shape({

	isOn: PropTypes.bool,
	callback: PropTypes.func,

	originalValue: PropTypes.number,
	value: PropTypes.number,

	sector: PropTypes.number,
	sectors: PropTypes.number,

	isOverAbortSector: PropTypes.bool,
	viewportCenter: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number,
	}),
});
