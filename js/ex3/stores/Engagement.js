var reflux = require('reflux'),
	charActions = require('ex3/actions/CharActions'),
	EngagementModel = require('ex3/models/Engagement');

module.exports = reflux.createStore({
	listenables: charActions,

	init: function() {
		this.model = new EngagementModel();
	},

	_trigger: function() {
		this.trigger(this.model);
	},

	onAdd: function(input) {
		this.model.addActors( pluralize(input) );
		this._trigger();
	},

	onRemove: function(input) {
		this.model.removeActors( pluralize(input) );
		this._trigger();
	},

	onTurnComplete: function() {
		this.model.nextTick();
		this._trigger();
	}
});


function pluralize(x) {
	if (x == null) return [];
	if (Array.isArray(x)) return x;
	return [x];
};
