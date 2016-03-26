var reflux = require('reflux');

const BattleActions = module.exports = reflux.createActions([
	"beginBattle",
	"endBattle",

	"nextRound",

	"enterBattle",
	"exitBattle",
	"removeEntirely",

	"setInit",
	"startTurn",
	"resetTurn",
	"endTurn",

	"setEssence",
]);


[
	// 'setName',			TODO: let GM change portraits/names in real time (eg, when you unmask Tuxedo Mask)
	// 'setPortrait',
	'setNotes'
].forEach((a) => {
	BattleActions[a] = reflux.createAction({sync: true});
});