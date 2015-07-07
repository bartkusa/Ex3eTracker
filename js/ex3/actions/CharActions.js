var reflux = require('reflux');

module.exports = reflux.createActions([
	"add",
	"remove", // TODO: Change to delete?
	"update",
	"activate",
	"deactivate",
	"save",
	"load",

	"setName",
	"setPortrait",
]);
