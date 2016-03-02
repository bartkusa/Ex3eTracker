"use strict";

import React from 'react/react';
import BattleView from 'ex3/components/BattleView';
import PersistentCharactersEditor from 'ex3/components/PersistentCharactersEditor';

import BattleShape from 'ex3/shapes/Battle';
import PersistentCharShape from 'ex3/shapes/PersistentCharacter';


export default React.createClass({

	propTypes: {
		battle: BattleShape,
		persistentCharacters: React.PropTypes.arrayOf(PersistentCharShape).isRequired,
	},

	render() {
		return (this.props.battle)
				? this._renderBattleView()
				: this._renderPCEditor();
	},

	_renderBattleView: function() {
		return <BattleView {...this.props.battle} />;
	},

	_renderPCEditor: function() {
		return <PersistentCharactersEditor
				persistentCharacters={this.props.persistentCharacters}
				/>;
	},
});
