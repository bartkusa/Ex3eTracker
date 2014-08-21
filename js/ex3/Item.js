define([
	"dojo/_base/declare",
	"helper/_MixinConstructor"
], function(
	declare,
	_MixinConstructor
) {
	return declare([_MixinConstructor.IgnoreUndef], {
		  name: "Item"

		, constructor: function(params) {
			this.type = "item";
		},

		toString: function() {
			return this.type + ': ' + this.name;
		}
	});
});