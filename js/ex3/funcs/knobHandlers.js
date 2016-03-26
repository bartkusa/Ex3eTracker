import gaEvent from 'ex3/funcs/ga';
import knobActions from 'ex3/actions/KnobActions';

const TAP_MSEC = 200;


export default function(startValue, callback) {

	const onTouchStart = function(e) {
		knobActions.start({
			touch: e.touches[0],
			value: startValue,
			callback,
		});

		e.preventDefault();  // Prevent touch from scrolling
		startWaitingToSeeIfTouchTurnsIntoHold();
	};

	const onTouchMove = function(e) {
		knobActions.update({ touch: e.touches[0] });
		e.preventDefault();
	};

	const onTouchEnd = function(e) {
		if (timeoutBeforeTapBecomesHold !== null) {
			clearTapTimeout();
			gaEvent('knob', 'touchtap');
		} else {
			knobActions.commit();
			gaEvent('knob', 'touchhold');
		}
	};

	return { onTouchStart, onTouchMove, onTouchEnd };
};


var timeoutBeforeTapBecomesHold = null;

function startWaitingToSeeIfTouchTurnsIntoHold() {
	clearTapTimeout();
	timeoutBeforeTapBecomesHold = setTimeout( clearTapTimeout, TAP_MSEC );
};

function clearTapTimeout() {
	if (!timeoutBeforeTapBecomesHold) return;
	clearTimeout( timeoutBeforeTapBecomesHold );
	timeoutBeforeTapBecomesHold = null;
};
