import { PropTypes } from 'react/react';


export default PropTypes.shape({
	isOn: PropTypes.bool,
	value: PropTypes.number,
	callback: PropTypes.func,
	sector: PropTypes.number,
	isOverAbortSector: PropTypes.bool,
	viewportCenter: PropTypes.shape({
		x: PropTypes.number.isRequired,
		y: PropTypes.number.isRequired,
	}),
});
