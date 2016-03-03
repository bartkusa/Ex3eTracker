import { HAS_GONE } from 'ex3/TurnStatus';


export function reverse(comparator) {
	return function() {
		return -1 * comparator.apply(this, arguments);
	}
};

export function trueLast(x, y) {
	return (x ? 1 : 0) - (y ? 1 : 0);
};

export function byHasAlreadyGoneLast(x, y) {
	return trueLast(x.turnStatus === HAS_GONE, y.turnStatus === HAS_GONE);
}
export const byHasAlreadyGoneFirst = reverse(byHasAlreadyGoneLast);


export function byExitedBattleLast(x, y) {
	return trueLast(!x.isInBattle, !y.isInBattle);
};


export function byInitAsc(x, y) {
	return x.initiative - y.initiative;
};
export const byInitDesc = reverse(byInitAsc);


export function byIncappedLast_WentFirst_InitDesc(x, y) {
	return byExitedBattleLast(x, y) || byHasAlreadyGoneFirst(x, y) || byInitDesc(x, y);
};
