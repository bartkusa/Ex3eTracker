var reflux = require('reflux');

const KnobActions = module.exports = reflux.createActions([
	"start",
	"abort",
	"update",
	"commit",
]);

[
	"update",
].forEach((a) => {
	KnobActions[a] = reflux.createAction({sync: true});
});
