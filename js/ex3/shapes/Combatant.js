import { PropTypes } from 'react/react';
import { TurnStatuses } from 'ex3/TurnStatus';


export default PropTypes.shape({

	id: PropTypes.number.isRequired, // what about provisional characters that aren't persisted yet??

	name: PropTypes.string,
	imgUrl: PropTypes.string,

	isInBattle: PropTypes.bool.isRequired,
	initiative: PropTypes.number,isRequired,
	turnStatus: PropTypes.oneOf( TurnStatuses ),

});
