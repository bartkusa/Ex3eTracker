var reflux = require('reflux');

module.exports = reflux.createActions([
	"beginBattle",
	"endBattle",

	"enterBattle",
	"exitBattle",

	"nextTick",
	"nextRound",

	"setInit",
	"setTurn",
]);
