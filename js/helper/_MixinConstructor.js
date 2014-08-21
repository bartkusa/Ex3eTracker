define([
	"dojo/_base/declare",
	"dojo/_base/lang"
], function(
	declare,
	lang
) {
	var klass = declare(null, {
		constructor: function(params) {
			if (params) lang.mixin(this, params);
		}
	});

	klass.IgnoreUndef = declare(null, {
		constructor: function(params) {
			if (!params) return;
			var keys = Object.keys(params);
			for (var i=0; keys && i<keys.length; i++) {
				var key = keys[i];
				var value = params[key];
				if (value !== undefined) this[key] = value;
			}
		}
	});

	return klass;
});