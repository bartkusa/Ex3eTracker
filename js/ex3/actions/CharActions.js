var reflux = require('reflux');

const CharActions = module.exports = reflux.createActions([
	"add",
	"remove", // TODO: Change to delete?
	"update",
	"save",
	"load",
	"setEssence",
	"setPortraitCenter",
]);

[
	'setName',
	'setPortrait',
	'setNotes',
].forEach((a) => {
	CharActions[a] = reflux.createAction({sync: true});
});