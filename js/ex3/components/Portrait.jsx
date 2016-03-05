import React from 'react/react';
import { mix } from 'ex3/funcs/utils';
import { DEFAULT_IMAGE_URL } from 'ex3/stores/PersistentCharacters';

require('./Portrait.less');


export default React.createClass({

	propTypes: {
		imgUrl: React.PropTypes.string.isRequired,
		imgPosX: React.PropTypes.number, // a percentage, represented by a number between 0 and 100
		imgPosY: React.PropTypes.number, // a percentage, represented by a number between 0 and 100
	},

	getDefaultProps: function() {
		return {
			imgPosX: 50,
			imgPosY: 50,
		};
	},

	render: function() {
		const p = this.props;
		const styles = mix(
			p.style,
			{
				backgroundImage: `url(${p.imgUrl || DEFAULT_IMAGE_URL})`,
				backgroundPositionX: p.imgPosX + '%',
				backgroundPositionY: p.imgPosY + '%',
			}
		);

		return (
			<div {...p}
				className={ `Portrait ${p.className || ''}` }
				style={styles}
				/>
		);
	},

});
