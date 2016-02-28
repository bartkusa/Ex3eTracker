function reverse(comparator) {
	return function() {
		return -1 * comparator.apply(this, arguments);
	}
};

function trueLast(x, y) {
	return (x ? 1 : 0) - (y ? 1 : 0);
};

// var logComps = function(comparator) {
// 	return function(x, y) {
// 		var comp = comparator.apply(this, arguments);

// 		if (comp === 0) {
// 			console.log(x.name || x, "=", y.name || y);
// 		} else if (comp < 0) {
// 			console.log(x.name || x, "<", y.name || y);
// 		} else {
// 			console.log(y.name || x, "<", x.name || y);
// 		}

// 		return comp;
// 	}
// };


function byHasGoneLast(x, y) {
	return trueLast(x.hasGone(), y.hasGone());
}
var byHasGoneFirst = reverse(byHasGoneFirst);


function byIncappedLast(x, y) {
	return trueLast(x.isIncapacitated(), y.isIncapacitated());
};


function byInitAsc(x, y) {
	return x.getInitiative() - y.getInitiative();
};
var byInitDesc = reverse(byInitAsc);


function byIncappedLast_WentFirst_InitDesc(x, y) {
	return byIncappedLast(x, y) || byHasGoneFirst(x, y) || byInitDesc(x, y);
};


module.exports = {
	byHasGoneFirst,
	byHasGoneLast,

	byIncappedLast,

	byInitAsc,
	byInitDesc,

	byIncappedLast_WentFirst_InitDesc,
};
