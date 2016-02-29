import { mix } from 'ex3/funcs/utils';


export function setState(partialNewState) {
	if (arguments.size <= 0) { // Somebody mutated something, and just wants to cause a rerender.
		this.trigger(this.state);
		return;
		// Maybe this should be a separate function, and not overload setState(...)...
	}

	this.replaceState( mix(this.state, partialNewState) );
	// This shallow-copy BS will probably explode one day. I *really* should be doing a Redux tree.
};

export function replaceState(totalNewState) {
	this.trigger( this.state = totalNewState ); // assign AND pass to trigger
};
