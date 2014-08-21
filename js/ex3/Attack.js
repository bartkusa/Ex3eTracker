define([
	"dojo/_base/declare",
	"helper/_MixinConstructor",
	"dojo/_base/lang",
	"ex3/consts"
], function(
	declare,
	_MixinConstructor,
	lang,
	ex3c
) {
	return declare([_MixinConstructor.IgnoreUndef], {
		  name: "Attack"

		, attr: ex3c.attr.dex.id
		, skill: ex3c.skill.mele.id
		, damageAttr: ex3c.attr.str.id

		, accuracy: 0 // if ranged, can be an array [close, short, med, long, etc].
		, damage: 0
		, minDamageAfterSoak: 1

		, tags: undefined

		, constructor: function(params) {
			this.tags = this.tags || [];
		}

		, getAccuracy: function(character, enemyRange) {
			var acc = this.accuracy;
			if (Array.isArray(acc)) {
				enemyRange = enemyRange || 0;
				if (enemyRange >= acc.length) throw "EnemyBeyondMaxRange";
				acc = acc[enemyRange];
			}

			var attrVal = character.attrs[this.attr].value || 0;
			var skillVal = characters.skills[this.skill].value || 0;

			return attrVal + skillVal + acc;
		}

		, getDamage: function(character, enemySoak) {
			var attrVal = this.damageAttr ? character.attrs[this.damageAttr].value : 0;
			var rawDamage = attrVal + this.damage;

			return Math.max(1, this.minDamageAfterSoak, rawDamage - (enemySoak || 0));
		}
	});
});