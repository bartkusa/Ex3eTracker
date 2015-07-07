"use strict";

const React = require('react/addons');
const PersistCharEditor = require('./PersistentCharacterEditor');
const PersistentCharacter = require('ex3/models/PersistentCharacter');
const charActions = require('ex3/actions/CharActions');


const PersistentCharactersEditor = module.exports = React.createClass({
	render: function() {
		return (
			<div className="PersistentCharactersEditor clearfix">
				<h1>Persistent Characters</h1>
				<div className="actions">
					<button className="addChar btn btn-success" onClick={this._addOnClick}>Add</button>&nbsp;
					<button className="addChar btn btn-default" onClick={this._loadOnClick}>Load</button>
					<button className="addChar btn btn-default" onClick={this._saveOnClick}>Save</button>
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
		charActions.add(new PersistentCharacter());
	},

	_loadOnClick: function() {
		charActions.load();
	},

	_saveOnClick: function() {
		charActions.save();
	}
});
