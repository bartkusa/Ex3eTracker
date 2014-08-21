define([
	"dojo/_base/declare",
	"ex3/Item"
], function(
	declare,
	Item
) {
	return declare([Item], {
		  type: "armor"
		, name: "Armor"
		, soak: 0
		, hardness: 0
		, mobilityPenalty: 0
		, inhibitsMartialArts: true

		, constructor: function() {
			this.type = "armor";
		}
	});
});