define([
	"dojo/_base/declare",
	"dojo/_base/lang"
], function(
	declare,
	lang
) {
	var reverse = function(comparator) {
		return function() {
			return -1 * comparator.apply(this, arguments);
		}
	};
	var logComps = function(comparator) {
		return function(x, y) {
			var comp = comparator.apply(this, arguments);

			if (comp === 0) {
				console.log(x.name || x, "=", y.name || y);
			} else if (comp < 0) {
				console.log(x.name || x, "<", y.name || y);
			} else {
				console.log(y.name || x, "<", x.name || y);
			}

			return comp;
		}
	};

	var byWentAlreadyLast = function(x, y) {
		return (x.hasGoneThisRound ? 1 : 0) - (y.hasGoneThisRound ? 1 : 0);
	}
	var byWentAlreadyFirst = reverse(byWentAlreadyLast);
	var byIncappedLast = function(x, y) {
		return (x.isIncapacitated() ? 1 : 0) - (y.isIncapacitated() ? 1 : 0);
	};
	var byInitAsc = function(x, y) {
		return x.initiative - y.initiative;
	};
	var byInitDesc = reverse(byInitAsc);
	var byIncappedLast_WentFirst_ThenInit = function(x, y) {
		return byIncappedLast(x, y) || byWentAlreadyFirst(x, y) || byInitDesc(x, y);
	};

	var isEligibleToGoThisRound = function(character) {
		return !character.hasGoneThisRound && !character.isIncapacitated();
	};


	return declare(null, {
		  round: 1
		, tick: undefined
		, characters: undefined
		, characterWhoIsUp: undefined

		, constructor: function(params) {
			this.characters = [];
			lang.mixin(this, params);
		}

		, getCharactersInitSorted: function() {
			return this.characters.slice(0).sort(
				//logComps(
					byIncappedLast_WentFirst_ThenInit
				//)
			);
		}

		, nextUp: function() {
			this.characterWhoIsUp = null;

			var charactersYetToGo = this.characters.filter(isEligibleToGoThisRound);
			if (!charactersYetToGo || charactersYetToGo.length <= 0) {
				this.round++;
				this.characters.map(function(c) { c.nextRound(this.round) });
				charactersYetToGo = this.characters.filter(isEligibleToGoThisRound);
			}
			if (!charactersYetToGo || charactersYetToGo.length <= 0) {
				throw "GameOver";
			}

			this.tick = Math.max.apply(Math, charactersYetToGo.map(function(c) { return c.initiative }));
		}
	});
});