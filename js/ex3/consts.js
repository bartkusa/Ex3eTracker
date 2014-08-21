define([], function() {

	var consts = {};

	function names() {
		var obj = {};
		for (var i=0; i<arguments.length; i++) {
			var row = arguments[i];
			obj[row[0]] = {
				 "id": row[0]
				,"name": row[1]
			};
		};
		return obj;
	};

	consts.attr = names(
		 ["str", "Strength"]
		,["dex", "Dexterity"]
		,["sta", "Stamina"]
		,["cha", "Charisma"]
		,["man", "Manipulation"]
		,["app", "Appearance"]
		,["int", "Intelligence"]
		,["wit", "Wits"]
		,["per", "Perception"]
	);
	
	consts.skill = names(
		 ["arch", "Archery"]
		,["athl", "Athletics"]
		,["awar", "Awareness"]
		,["bure", "Bureaucracy"]
		,["craf", "Craft"]
		,["dodg", "Dodge"]
		,["inte", "Integrity"]
		,["inve", "Investigation"]
		,["larc", "Larceny"]
		,["ling", "Linguistics"]
		,["lore", "Lore"]
		,["mart", "Martial Arts"]
		,["medi", "Medicine"]
		,["mele", "Melee"]
		,["occu", "Occult"]
		,["perf", "Performance"]
		,["pres", "Presence"]
		,["resi", "Resistance"]
		,["ride", "Ride"]
		,["sail", "Sail"]
		,["soci", "Socialize"]
		,["stea", "Stealth"]
		,["surv", "Survival"]
		,["thro", "Thrown"]
		,["warr", "War"]
	);

	consts.stuff = names(
		 ["ess", "Essence"]
		,["wp", "Willpower"]
		,["hl", "Health Levels"]
	);

	return consts;
});