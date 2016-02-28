export function setState(partialNewState) {
	this.replaceState( partialNewState ); // TODO: merge partialNew into this.state?
};

export function replaceState(totalNewState) {
	this.trigger( this.state = totalNewState ); // assign AND pass to trigger
};
