define([
	  "dojo/_base/declare"
	, "dojo/_base/lang"
], function(
	  declare
	, lang
) {
	return declare(null, {
		  initiative: 3
		, hasGoneThisRound: false

		, damage: undefined
		, parryOnslaught: 0
		, dodgeOnslaught: 0
		, defenseOnslaught: 0

		, constructor: function(params) {
			if (!params.platonicCharacter) throw "CharacterMissing";

			this.damage = {
				bashing: 0,
				lethal: 0,
				aggravated: 0
			};
			this.equipment = {};

			lang.mixin(this, params.platonicCharacter);

			this.willpower = this.maxWillpower;
			this.motes = (this.maxPersonalMotes || 0) + (this.maxPeripheralMotes || 0);
			this.maxMotes = this.motes;

			lang.mixin(this, params);
		}

		, getDamage: function() {
			return (this.damage.bashing || 0) +
				(this.damage.lethal || 0) +
				(this.damage.aggravated || 0);
		}

		, getWoundPenalty: function() {
			var damage = this.getDamage();
			return (!this.healthLevels || damage >= this.healthLevels.size)
				? Number.INFINITY
				: this.healthLevels[damage];
		}

		, isIncapacitated: function() {
			return (this.getWoundPenalty() === Number.INFINITY);
		}

		, getSoak: function() {
			return this.attrs.sta.value + (this.equipment.armor ? this.equipment.armor.soak : 0);
		}

		, nextRound: function() {
			this.hasGoneThisRound = false;
		}

		, beginTurn: function() {
			this.parryOnslaught = this.dodgeOnslaught = this.defenseOnslaught = 0;
			if (this.isEssenceUser()) {
				this.motes = Math.min(this.motes + 5, this.maxMotes);
			}
			// check if survived crash long enough
		}
		, endTurn: function() {
			this.hasGoneThisRound = true;
		}

		, getPersonalMotes: function() {
			return Math.max(0, this.motes - this.maxPeripheralMotes);
		}
		, getPeripheralMotes: function() {
			return Math.min(Math.max(0, this.motes), this.maxPeripheralMotes);
		}
	});
});