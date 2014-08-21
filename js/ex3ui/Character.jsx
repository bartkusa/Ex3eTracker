/** @jsx React.DOM */
"use strict";
if (!window.ex3ui) window.ex3ui = {};

var nbsp = String.fromCharCode(160);


var Initiative = React.createClass({
	render: function() {
		if (this.props.isGoing) return (
			<button type="button" className="init stat btn btn-lg btn-danger" onClick={this.onButtonClick}>Done</button>
		);

		var valueNode = ( <div className="value">{this.props.value || this.props.value === 0}</div> );

		if (this.props.isUp) return (
			<button type="button" className="init stat btn btn-lg btn-success" onClick={this.onButtonClick}>{valueNode}</button>
		);

		return (
			<div className="stat init">{valueNode}</div>
		);
	},

	onButtonClick: function() {
		this.props.isGoing
			? (('function' === typeof this.props.onEndTurn) && this.props.onEndTurn())
			: (('function' === typeof this.props.onStartTurn) && this.props.onStartTurn());
	}
});
window.ex3ui.Initiative = Initiative;


var StatBlock = React.createClass({
	render: function() {
		var validValue = this.props.value || this.props.value === 0;
		var css = [
			"stat",
			(!validValue || this.props.isInvisible) ? "invisible" : "",
			this.props.isBump ? "bumpAfter" : "",
			this.props.classes || ""
		].join(" ");

		return (
			<div className={css}>
				<div className="value">{validValue ? this.props.value : nbsp}</div>
				<div className="what">{this.props.label || ""}</div>
			</div>
		);
	}
});
window.ex3ui.StatBlock = StatBlock;


var getCharacterActionState = function(c, curTick) {
	if (c.isIncapacitated()) return "incapped";
	if (c.hasGoneThisRound) return "hasGoneThisRound";
	if (c.initiative == curTick) return "isUp";
	return "";
};
var Character = React.createClass({
	getInitialState: function() {
		return { isGoing: false }
	},

	handleStartTurn: function() {
		this.props.char.beginTurn();
		this.setState({ isGoing: true });
		if ('function' === typeof this.props.onEndTurn) this.props.onEndTurn();
	},
	handleEndTurn: function() {
		this.props.char.endTurn();
		this.setState({ isGoing: false });
		if ('function' === typeof this.props.onEndTurn) this.props.onEndTurn();
	},

	render: function() {
		var chr = this.props.char;

		var portraitStyle = {
			backgroundImage: 'url(' + chr.imgUrl + ')'
		};
		var numHealthLevels = chr.healthLevels.length;
		var actionState = getCharacterActionState(chr, this.props.curTick);

		return (
			<div className ={"character " + actionState} >
				<Initiative
					value={chr.initiative}
					isUp={actionState==="isUp"}
					isGoing={this.state.isGoing}
					onStartTurn={this.handleStartTurn}
					onEndTurn={this.handleEndTurn}
					/>
				<div className="portrait" style={portraitStyle}></div>
				<div className="topRow">
					<div className="name">{chr.name}</div>
					<p className="status">
						<span className="label label-success">Distraction Bonus</span> <span className="label label-primary">Snake Stance</span>
					</p>
				</div>
				<div className="stat">
					<div className="value">4</div>
					<div className="what">Parry</div>
				</div>
				<div className="stat">
					<div className="value">1</div>
					<div className="what">Dodge</div>
				</div>
				<div className="stat">
					<div className="value">{chr.getSoak()}</div>
					<div className="what">Soak</div>
				</div>
				<div className="stat bumpAfter ">
					<div className="value">2</div>
					<div className="what">Hardness</div>
				</div>
				<StatBlock label="Personal"   value={chr.getPersonalMotes()}   isInvisible={!chr.isEssenceUser()} />
				<StatBlock label="Peripheral" value={chr.getPeripheralMotes()} isInvisible={!chr.isEssenceUser()} isBump={true} />

				<StatBlock label="Willpower" value={chr.willpower} />
				<StatBlock
					label={(numHealthLevels - chr.getDamage()) + '/' + numHealthLevels + ' Health'}
					value={chr.getWoundPenalty()} />
			</div>
		);
	}
});
window.ex3ui.Character = Character;


var CharacterList = React.createClass({
	render: function() {
		var curTick = this.props.game.tick;
		var handleEndTurn = this.handleEndTurn;
		var renderEachFn = function(c) {
			return (
				<Character
					char={c}
					curTick={curTick}
					onEndTurn={handleEndTurn}
					/>
			);
		};

		return (
			<div>
				<h1>Intense Battle (Round {this.props.game.round})</h1>
				<div className="CharacterList">
					{this.props.game.characters.map(renderEachFn)}
				</div>
			</div>
		);
	},

	handleEndTurn: function() {
		this.props.game.nextUp();
		this.setProps(this.props);
	}
});
window.ex3ui.CharacterList = CharacterList;
