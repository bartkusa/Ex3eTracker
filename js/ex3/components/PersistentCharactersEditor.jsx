"use strict";

import React from 'react/react';
import PersistCharEditor from './PersistentCharacterEditor';

import charActions from 'ex3/actions/CharActions';
import { beginBattle } from 'ex3/actions/BattleActions';

require('./PersistentCharactersEditor.less');


export default React.createClass({
	render: function() {
		return (
			<div className="PersistentCharactersEditor clearfix">
				<h1>Persistent Characters</h1>
				<div className="actions">
					<button className="addChar btn btn-success" onClick={this._addOnClick}>Add</button>
					&nbsp;
					<button className="loadChars btn btn-default" onClick={this._loadOnClick}>Load</button>
					<button className="saveChars btn btn-default" onClick={this._saveOnClick}>Save</button>
					&nbsp;
					<button className="beginBattle btn btn-default" onClick={this._beginBattleOnClick}>Join Battle</button>
				</div>
				{this._renderCharList()}
			</div>
		);
	},

	_renderCharList: function() {
		const pcList = this.props.persistentCharacters
				.map((x, i) => x)
				.reverse();

		if (!pcList || pcList.length <= 0) return (
			<div className="ghostTown">You have no characters.</div>
		);

		return <ul className="chars">{pcList.map(this._renderChar)}</ul>;
	},

	_renderChar: function(persistChar, index) {
		return (
			<li key={persistChar.id}>
				<PersistCharEditor persistentCharacter={persistChar} />
			</li>
		);
	},

	_addOnClick: function() {
		charActions.add({});
	},

	_loadOnClick: function() {
		charActions.load();
	},

	_saveOnClick: function() {
		charActions.save();
	},

	_beginBattleOnClick: function() {
		beginBattle();
	},
});
