define([
	"dojo/_base/declare"
], function(
	declare
) {
	return declare(null, {
		 constructor: function(skillType, value, specialties) {
			this.type = skillType;
			this.name = skillType.name;
			this.value = value || 0;

			this.specialties = specialties || [];
		},

		toString: function() {
			var specStr = (this.specialties && this.specialties.length > 0)
				? ' (' + this.specialties.join(", ") + ')'
				: '';

			return this.name + ' ' + this.value + specStr;
		}
	});
});