var UNIQUE_ID = 1;
function getUniqueId() {
	return UNIQUE_ID++;
}


class PersistentCharacter {

	constructor(args = {}) {
		this.id = getUniqueId();
		this.name = args.name || "Jane Doe";
		this.imgUrl = args.imgUrl || null;

		this.healthLevels = args.healthLevels || [0, 0, -1, -1, -2, -2, -4];
		this.willpower = args.willpower || 5;

		this.essence = args.essence || 0;
		this.personalMotes = args.personalMotes || null;
		this.personalMotes = args.peripheralMotes || null;
	}

	isEssenceUser() {
		return this.essence > 1
			&& typeof this.personalMotes === 'number'
			&& typeof this.maxPeripheralMotes === 'number';
	}
};


module.exports = PersistentCharacter;
