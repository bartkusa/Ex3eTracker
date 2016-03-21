"use strict";

import React from 'react/react';
import BattleView from 'ex3/components/BattleView';
import Knob from 'ex3/components/TouchKnob/Knob';
import PersistentCharactersEditor from 'ex3/components/PersistentCharactersEditor';

import BattleShape from 'ex3/shapes/Battle';
import PersistentCharShape from 'ex3/shapes/PersistentCharacter';

require ('style/blur.less');


export default React.createClass({

	propTypes: {
		battle: BattleShape,
		knob: React.PropTypes.object,
		persistentCharacters: React.PropTypes.arrayOf(PersistentCharShape).isRequired,
		areUnsavedChanges: React.PropTypes.bool,
	},

	render() {
		return (
			<div className="MainUi">
				{ this._renderKnob() }
				<div className={this.props.knob.isOn ? 'blur' : ''}>
					{ (this.props.battle) ? this._renderBattleView() : this._renderPCEditor() }
				</div>
			</div>
		);
	},

	_renderKnob: function() {
		if (!this.props.knob || !this.props.knob.isOn) return;
		return <Knob key="knob" {...this.props.knob} />;
	},

	_renderBattleView: function() {
		return <BattleView {...this.props.battle} key="battle" />;
	},

	_renderPCEditor: function() {
		return (
			<PersistentCharactersEditor
				key="persistentCharacters"
				persistentCharacters={this.props.persistentCharacters}
				areUnsavedChanges={this.props.areUnsavedChanges}
				/>
		);
	},
});
