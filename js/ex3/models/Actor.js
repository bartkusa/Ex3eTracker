function notImpl() {
	throw new Error ("Not Implemented");
};


class Actor {
	constructor(args = {}) {
		this.initiative = args.initiative || 3;
		this.hasGoneThisRound = args.hasGoneThisRound || false;
	}

	getInitiative() {
		return this.initiative;
	}

	canGo() {
		return !this.hasGone() && !this.isIncapacitated();
	}

	hasGone() {
		return this.hasGoneThisRound;
	}

	isIncapacitated() {
		return false;
	}

	nextRound(round) {
		this.hasGoneThisRound = false;
	}
};


module.exports = EngagedCharacter;
