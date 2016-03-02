import { PropTypes } from 'react/react';

export default PropTypes.shape({

	round: PropTypes.number.isRequired,
	tick: PropTypes.number.isRequired,

	combatants: PropTypes.arrayOf( PropTypes.object ),

});
