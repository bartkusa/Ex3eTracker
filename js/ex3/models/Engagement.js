var ActorComp = require('../funcs/ActorComparators');


class Engagement {
	constructor(args = {}) {
		this.actors = args.actors || [];
		this.round = args.round || 1;
		this.tick = args.tick || null;
	},

	addActors(actors) {
		// FIXME: Validate actors are actors
		// FIXME: Dedupe actors????
		this.actors.push(actors);
	}

	removeActors(actors) {
		//FIXME: Validate actors are actors
		this.actors = this.actors.filter((a) => (actors.indexOf(a) < 0));
	}

	getActorsInitSorted() {
		return this.actors
				.slice(0)
				.sort(AcActorComptorSort.byIncappedLast_WentFirst_InitDesc);
	}

	nextRound() {
		this.round++;
		this.actors.forEach((a) => a.nextRound());
	}

	nextTick() {
		var couldGo = this.actors.filter((c) => c.canGo());
		if (couldGo.length === 0) {
			this.nextRound();
			couldGo = this.actors.filter((c) => c.canGo());
		}

		this.tick = Math.max( ...couldGo.map((a) => a.getInitiative()) );
	}
};


module.exports = Engagement;
