"use strict";

import React from 'react/react';
import PersistentCharactersEditor from 'ex3/components/PersistentCharactersEditor';


export default React.createClass({

	propTypes: {
		persistentCharacters: React.PropTypes.array,
		battle: React.PropTypes.object,
	},

	render() {
		if (this.props.battle) alert("hiyo!!!!");
		
		return <PersistentCharactersEditor
				persistentCharacters={this.props.persistentCharacters}
				/>;
	},
});
