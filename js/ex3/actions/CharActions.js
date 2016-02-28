var reflux = require('reflux');

module.exports = reflux.createActions([
	"add",
	"remove", // TODO: Change to delete?
	"update",
	"save",
	"load",

	"setName",
	"setPortrait",
]);
