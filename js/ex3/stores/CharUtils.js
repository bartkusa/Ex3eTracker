export function pluralize(x) {
	if (x == null) return [];
	if (Array.isArray(x)) return x;
	return [x];
};

export function toIds(things) {
	return pluralize(things)
			.map((thing) => thing.id >= 0 ? thing.id : thing);
};

export function idsMatch(cur, selector) {
	if (!selector) return false;
	return cur.id === (selector.id || selector);
};
