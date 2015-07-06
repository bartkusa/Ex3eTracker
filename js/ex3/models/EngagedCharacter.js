var PersistentCharacter = require('./PersistentCharacter');
var Actor = require('./Actor');

class EngagedCharacter extends Actor {
	constructor(args = {}) {
		if (!(args.persistChar instanceof PersistentCharacter)) {
			throw new Error("Can't make EngagedCharacter from: ", args.persistChar);
		}

		super(args);
		this.persistChar = args.persistChar;

		this.onslaught = args.onslaught || 0;
		this.bashingWounds = args.bashingWounds || 0;
		this.lethalWounds = args.lethalWounds || 0;

		this.willpower = args.willpower || this.persistChar.willpower;
		this.personalMotes = args.personalMotes || this.persistChar.personalMotes;
		this.peripheralMotes = args.peripheralMotes || this.persistChar.peripheralMotes;
	}

	isEssenceUser() {
		return this.persistChar.isEssenceUser();
	}

	getWoundPenalty() {
		var wounds = this.bashingWounds + this.lethalWounds;
		if (wounds >= this.persistChar.healthLevels.length) return Infinity;
		return this.persistChar.healthLevels[wounds];
	}

	isIncapacitated() {
		return this.getWoundPenalty() === Infinity;
	}
};


module.exports = EngagedCharacter;
