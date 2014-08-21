define([
	  "dojo/_base/declare"
	, "dojo/_base/lang"
	, "ex3/Item"
	, "ex3/Attack"
	, "ex3/Parry"
], function(
	  declare
	, lang
	, Item
	, Attack
	, Parry
) {
	var Weapon = declare([Item], {
		  type: "weapon"
		, name: "Weapon"

		, attacks: undefined
		, parries: undefined
		, tags: undefined

		 , constructor: function(params) {
			this.attacks = this.attacks || [];
			this.parries = this.parries || [];
			this.tags = this.tags || [];
			this.type = "weapon";
		}
	});


	Weapon.Light = declare([Weapon], {
		  name: "Light Weapon"
		, constructor: function(params) {
			var attack = new Attack({
				attr: params.attr,
				skill: params.skill,
				damageAttr: params.damageAttr,
				accuracy: params.accuracy || 4,
				damage: params.damage || 7,
				tags: params.tags
			});

			var parry = new Parry({
				attr: params.attr,
				skill: params.skill,
				bonus: params.bonus || 1,
				tags: params.tags
			});

			this.attacks.push(attack);
			this.parries.push(parry);
		}
	});

	return Weapon;
});