var reflux = require('reflux');

module.exports = reflux.createActions([
	"beginBattle",
	"endBattle",

	"nextRound",

	"enterBattle",
	"exitBattle",

	"setInit",
	"startTurn",
	"resetTurn",
	"endTurn",
]);
