import { asArray } from 'ex3/funcs/utils';


export function toIds(things) {
	return asArray(things)
			.map((thing) => thing.id >= 0 ? thing.id : thing);
};

export function toIdSet(things) {
	return toIds(things)
		.reduce(
			(set, curId) => (set[curId] = true, set),
			{}
		);
};

export function idsMatch(cur, selector) {
	if (!selector && selection !== 0) return false;
	return cur.id === selector || cur.id === selector.id;
};

export function pluralize(x) { //Deprecated
	return asArray(x);
};
