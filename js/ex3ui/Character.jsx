/** @jsx React.DOM */
"use strict";
if (!window.ex3ui) window.ex3ui = {};

var nbsp = String.fromCharCode(160);


var Initiative = React.createClass({
	render: function() {
		return (
			<div className="stat init">
				<div className="value">{this.props.value}</div>
			</div>
		);
	}
});
window.ex3ui.Initiative = Initiative;


var InitButton = React.createClass({
	render: function() {
		if (this.props.isGoing) {
			return (
				<button
						type="button"
						className="init stat btn btn-lg btn-danger"
						onClick={this.props.onEndTurn}
						>
					Done
				</button>
			);
		}

		return (
			<button
					type="button"
					className="init stat btn btn-lg btn-success"
					onClick={this.props.onStartTurn}
					>
				<div className="value">{this.props.value}</div>
			</button>
		);
	}
});
window.ex3ui.InitButton = InitButton;


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


var getCharacterActionState = function(c, game) {
	if (c.isIncapacitated()) return "incapped";
	if (c.hasGoneThisRound) return "hasGoneThisRound";
	if (c === game.characterWhoIsUp) return "isUp";
	if (c.initiative === game.tick) return "mayGo";
	return "";
};
var Character = React.createClass({
	handleStartTurn: function() {
		this.props.game.characterWhoIsUp = this.props.char;
		this.props.char.beginTurn();
		if ('function' === typeof this.props.onStartTurn) this.props.onStartTurn();
	},
	handleEndTurn: function() {
		//var newInit = window.prompt("New initiative?", this.props.char.initiative);
		//if ('number' === typeof +newInit) this.props.char.initiative = +newInit;
		this.props.char.endTurn();
		if ('function' === typeof this.props.onEndTurn) this.props.onEndTurn();
	},

	render: function() {
		var chr = this.props.char;
		var game = this.props.game;

		var numHealthLevels = chr.healthLevels.length;
		var actionState = getCharacterActionState(chr, this.props.game);
		var styles = { top: this.props.top || undefined };

		var portraitStyles = {
			backgroundImage: 'url(' + chr.imgUrl + ')'
		};

		// Initiative UI ///////////////////////////////////////////////////////

		var thisCharShouldSeeButton = (chr === game.characterWhoIsUp) ||
			(!game.characterWhoIsUp && actionState === "mayGo");
		var initiativeControl = thisCharShouldSeeButton
			? (<InitButton
				value={chr.initiative}
				isGoing={chr === game.characterWhoIsUp}
				onStartTurn={this.handleStartTurn}
				onEndTurn={this.handleEndTurn}
				/>)
			: (<Initiative
				value={chr.initiative}
				/>);

		return (
			<div className={"character " + actionState} style={styles}>
				{initiativeControl}
				<div className="portrait" style={portraitStyles}></div>
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
Character.calcHeightMultiples = function(i) {
	return (i * 10) + 'em';
};
window.ex3ui.Character = Character;



var CharacterList = React.createClass({
	handleStartTurn: function() {
		this.setState({});
		if ('function' === typeof this.props.onStartTurn) this.props.onStartTurn();
	},
	handleEndTurn: function() {
		if ('function' === typeof this.props.onEndTurn) this.props.onEndTurn();
	},

	render: function() {
		var game = this.props.game;
		var handleStartTurn = this.handleStartTurn;
		var handleEndTurn = this.handleEndTurn;

		var styles = {};
		styles.height = Character.calcHeightMultiples(game.characters.length || 0);

		var charToIndex = {};
		game.getCharactersInitSorted().forEach(function(c,i) {
			charToIndex[c.name] = i;
		});

		var characterUis = game.characters.map( function(c){
			return (
				<Character
					key={c.name}
					top={Character.calcHeightMultiples(charToIndex[c.name])}
					char={c}
					game={game}
					onStartTurn={handleStartTurn}
					onEndTurn={handleEndTurn}
					/>
			);
		} );

		return (
			<div className="CharacterList" ref="list" style={styles}>
				{characterUis}
			</div>
		);
	}
});
window.ex3ui.CharacterList = CharacterList;


var GameUi = React.createClass({
	handleEndTurn: function() {
		this.props.game.nextUp();
		this.setState({});
	},

	render: function() {
		return (
			<div className="ExaltedGame">
				<h1>Intense Battle (Round {this.props.game.round})</h1>
				<CharacterList
					game={this.props.game}
					onEndTurn={this.handleEndTurn}
					/>
			</div>
		);
	}
});
window.ex3ui.GameUi = GameUi;
