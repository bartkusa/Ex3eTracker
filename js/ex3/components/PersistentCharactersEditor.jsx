"use strict";

var React = require('react/addons');
var PersistentCharacter = require('./PersistentCharacterEditor');


var PersistentCharactersEditor = module.exports = React.createClass({
	render: function() {
		return (
			<div className="PersistentCharactersEditor">
				<button className="addChar">Add</button>
				{this._renderCharList()}
			</div>
		);
	},

	_renderCharList: function() {
		let pcList = this.props.persistentCharacters;

		if (!pcList || pcList.length <= 0) return (
			<div className="ghostTown">You have no characters.</div>
		);

		return <ul className="chars">{pcList.map(this._renderChar)}</ul>;
	},

	_renderChar: function(persistChar, index) {
		return (
			<li key={persistChar.id}>
				<PersistentCharacter persistentCharacter={persistChar} />
			</li>
		);
	}
});
