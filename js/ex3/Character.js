define([
	  "dojo/_base/declare"
	, "helper/_MixinConstructor"
	, "dojo/_base/lang"
	, "ex3/consts"
	, "ex3/Attribute"
	, "ex3/Skill"
], function(
	  declare
	, _MixinConstructor
	, lang
	, c
	, Attribute
	, Skill
) {
	var make = function(Klass, constSet, defaultVal) {
		var statsObj = {};
		Object.keys(constSet).forEach(function(key) {
			statsObj[key] = new Klass(constSet[key]);
		});
		return statsObj;
	};


	var klass = declare([_MixinConstructor.IgnoreUndef], {
		  name: "Le Boeuf"
		, imgUrl: "./img/charMonk.jpg"
		, maxWillpower: 5

		, essence: 1
		, maxPersonalMotes: undefined
		, maxPeripheralMotes: undefined

		, constructor: function(properties) {
			this.healthLevels = this.healthLevels || [0, 0, -1, -1, -2, -2, -4];

			this.attrs  = make(Attribute, c.attr, 1);
			this.skills = make(Skill, c.skill, 0);
		}

		, isEssenceUser: function() {
			return (this.maxPersonalMotes !== undefined || this.maxPeripheralMotes !== undefined);
		}
	});
	return klass;
});