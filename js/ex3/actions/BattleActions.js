var reflux = require('reflux');

module.exports = reflux.createActions([
	"beginBattle",
	"endBattle",

	"enterBattle",
	"exitBattle",

	"startTurn",
	"endTurn",
	"resetTurn",
]);
