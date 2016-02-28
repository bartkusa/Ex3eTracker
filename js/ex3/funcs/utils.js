export function asArray(x) {
	if (Array.isArray(x)) return x;
	if (x == null) return [];
	return [x];
};

export function mix(...mixins) {
	return Object.assign({}, ...mixins); // caveat: shallow-copy!
};
