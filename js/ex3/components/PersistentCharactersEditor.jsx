"use strict";

import React from 'react/react';
import PersistCharEditor from './PersistentCharacterEditor';

import charActions from 'ex3/actions/CharActions';
import { beginBattle } from 'ex3/actions/BattleActions';

import PersistentCharShape from 'ex3/shapes/PersistentCharacter';

require('./PersistentCharactersEditor.less');
require('style/semanticList.less');


export default React.createClass({

	propTypes: {
		persistentCharacters: React.PropTypes.arrayOf(PersistentCharShape).isRequired,
	},

	render: function() {
		return (
			<div className="PersistentCharactersEditor clearfix">
				<h1>Character Roster</h1>
				<div className="actions">
					<button className="addChar btn btn-success" onClick={this._addOnClick}>Add New Character</button>
					{" "}
					<button className="loadChars btn btn-default" onClick={this._loadOnClick}>Load</button>
					<button className="saveChars btn btn-default" onClick={this._saveOnClick}>Save</button>
					{" "}
					<button className="beginBattle btn btn-primary" onClick={this._beginBattleOnClick}>Join Battle</button>
					
				</div>
				{this._renderCharList()}
			</div>
		);
	},

	_renderCharList: function() {
		const pcList = this.props.persistentCharacters;

		if (!pcList || pcList.length <= 0) return (
			<div className="ghostTown">You have no characters.</div>
		);

		return <ul className="chars semanticList">{pcList.map(this._renderChar)}</ul>;
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
