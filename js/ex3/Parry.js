define([
	"dojo/_base/declare",
	"helper/_MixinConstructor",
	"ex3/consts"
], function(
	declare,
	_MixinConstructor,
	ex3c
) {
	return declare([_MixinConstructor.IgnoreUndef], {
		  name: "Parry"
		, attr: ex3c.attr.dex.id
		, skill: ex3c.skill.mele.id
		, bonus: 0

		, tags: undefined

		, constructor: function() {
			this.tags = this.tags || [];
		}

		, getParry: function(character) {
			var attrVal = character.attrs[this.attr].value || 0;
			var skillVal = characters.skills[this.skill].value || 0;

			return this.bonus + Math.ceil((attrVal + skillVal)/2);
		}
	});
});