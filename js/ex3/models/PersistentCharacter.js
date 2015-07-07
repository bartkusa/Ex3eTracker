"use strict";


var NEXT_UNUSED_UNIQUE_ID = 1;
function getUniqueId() {
	return NEXT_UNUSED_UNIQUE_ID++;
};
function updateUniqueId(characters = []) {
	NEXT_UNUSED_UNIQUE_ID = (characters.length === 0)
			? 1
			: Math.max(...characters.map((pc) => pc.id || 0)) + 1;
	console.log("NEXT_UNUSED_UNIQUE_ID: ", NEXT_UNUSED_UNIQUE_ID);
};


class PersistentCharacter {
	constructor(args = {}) {
		this.id = getUniqueId();
		this.name = args.name || "";
		this.setImgUrl(args.imgUrl);

		this.healthLevels = args.healthLevels || [0, 0, -1, -1, -2, -2, -4];
		this.willpower = args.willpower || 5;

		this.essence = args.essence || 0;
		this.personalMotes = args.personalMotes || null;
		this.personalMotes = args.peripheralMotes || null;
	}

	setImgUrl(imgUrl) {
		this.imgUrl = imgUrl || "/ex/img/charDefault.jpg";
	}

	isEssenceUser() {
		return this.essence > 1
			&& typeof this.personalMotes === 'number'
			&& typeof this.maxPeripheralMotes === 'number';
	}
};


PersistentCharacter.updateUniqueId = updateUniqueId;

module.exports = PersistentCharacter;
