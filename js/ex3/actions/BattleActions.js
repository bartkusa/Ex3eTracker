var reflux = require('reflux');

module.exports = reflux.createActions([
	"beginBattle",
	"endBattle",

	"enterBattle",
	"exitBattle",

	"setInit",

	"startTurn",
	"endTurn",
	"resetTurn",
]);
