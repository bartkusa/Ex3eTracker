define([
	"dojo/_base/declare"
], function(
	declare
) {
	return declare(null, {
		 constructor: function(attrType, value) {
			this.type = attrType;
			this.name = attrType.name;
			this.value = value || 1;
		},

		toString: function() {
			return this.name + ' ' + this.value;
		}
	});
});