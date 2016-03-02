"use strict";

import React from 'react/react';

import battleActions from 'ex3/actions/BattleActions';

import BattleShape from 'ex3/shapes/Battle';

// require('./PersistentCharactersEditor.less');


export default React.createClass({

	propTypes: BattleShape.isRequired,

	render: function() {
		const p = this.props;

		return (
			<div className="BattleView clearfix">
				<h1>Battle View</h1>
				<div className="BattleStats">
					Round {p.round}, tick {p.tick}
				</div>
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
		return this.props.combatants.map( (c, i) => (
			<div key={i}>{ JSON.stringify(c) }</div>
		));
	},
});
