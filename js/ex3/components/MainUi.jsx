"use strict";

import React from 'react/react';
import BattleView from 'ex3/components/BattleView';
import Overlay from 'ex3/components/TouchKnob/Overlay';
import PersistentCharactersEditor from 'ex3/components/PersistentCharactersEditor';

import BattleShape from 'ex3/shapes/Battle';
import PersistentCharShape from 'ex3/shapes/PersistentCharacter';


export default React.createClass({

	propTypes: {
		battle: BattleShape,
		// knob: React.PropTypes.whatever,
		persistentCharacters: React.PropTypes.arrayOf(PersistentCharShape).isRequired,
	},

	render() {
		return (
			<div className="MainUi">
				{ this._renderKnob() }
				{ (this.props.battle) ? this._renderBattleView() : this._renderPCEditor() }
			</div>
		);
	},

	_renderKnob: function() {
		if (this.props.knob && this.props.knob.isOn) return <Overlay key="knobOverlay" />;
	},

	_renderBattleView: function() {
		return <BattleView {...this.props.battle} key="battle" />;
	},

	_renderPCEditor: function() {
		return (
			<PersistentCharactersEditor
				key="persistentCharaters"
				persistentCharacters={this.props.persistentCharacters}
				/>
		);
	},
});
