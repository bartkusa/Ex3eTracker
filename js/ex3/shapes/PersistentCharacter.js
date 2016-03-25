import { PropTypes } from 'react/react';

export default PropTypes.shape({

	id: PropTypes.number.isRequired, // what about provisional characters that aren't persisted yet??

	name: PropTypes.string,
	imgUrl: PropTypes.string,
	notes: PropTypes.string,

	personalEss: PropTypes.number,
	peripheralEss: PropTypes.number,

});
