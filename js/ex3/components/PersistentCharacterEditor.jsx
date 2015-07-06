"use strict";

var React = require('react/addons');
var	charActions = require('ex3/actions/CharActions');


var PersistentCharacterEditor = module.exports = React.createClass({
	render: function() {
		let pc = this.props.persistentCharacter;

		return (
			<div className="PersistentCharacterEditor">
				<input type="text"
					onKeyDown={this._nameOnKeyDown}
					value={pc.name}
					/>
				<button className="remove" onClick={this._removeOnClick}>Remove</button>
			</div>
		);
	},

	_nameOnKeyDown: function(evt) {
		console.log(evt);
	},

	_removeOnClick: function(evt) {
		charActions.remove( this.props.persistentCharacter );
	}
});
