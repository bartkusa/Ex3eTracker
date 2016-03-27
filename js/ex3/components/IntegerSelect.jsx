import React from 'react/react';
const { createClass, PropTypes } = React;
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';

import rangeRight from 'lodash/rangeRight';
import throttle from 'lodash/throttle';

require('./IntegerSelect.less');

const MIN_MOUSEWHEEL_PERIOD = 33; //msec?? this is not acting like I expected


export default createClass({

	mixins: [PureRenderMixin],

	propTypes: {
		onChange: PropTypes.func.isRequired,
		onWheelIncrement: PropTypes.func,
		min: PropTypes.number.isRequired,
		max: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
	},

	componentWillMount: function() {
		this._onWheelThrottled = throttle(
			this._onWheelThrottled,
			MIN_MOUSEWHEEL_PERIOD,
			{ leading: true, trailing: false }
		);
	},

	_onChange: function(e) {
		this.props.onChange(+e.target.value, e); // "+" can convert strings to numbers
	},

	_onWheel: function(e) {
		// Ignore wheel events that aren't vertical, OR where the vertical isn't the biggest-magnitude change.
		if (e.deltaY === 0) return;
		if (Math.abs(e.deltaY) < Math.abs(e.deltaX) || Math.abs(e.deltaY) < Math.abs(e.deltaZ)) return;

		e.preventDefault();         // Do not ACTUALLY scroll the page.
		this._onWheelThrottled(e);  // MacBook touchpads are hella sensitive. Don't fire so frequently!
	},
	_onWheelThrottled: function({deltaY}) {
		const direction = (deltaY < 0) ? 1 : -1; // scrolling up has negative deltaY, but should have a positive effect
		(!!this.props.onWheelIncrement)
			? this.props.onWheelIncrement(direction)
			: this.props.onChange(this.props.value + direction);
	},

	render: function() {
		const disabled = this.props.disabled || this.props.max <= this.props.min;

		return (
			<select {...this.props}
					className={`IntegerSelect ${this.props.className || ""}`}
					disabled={disabled}
					onChange={this._onChange}
					onWheel={!disabled && this._onWheel}
					value={this.props.value}
					>
				{ renderOptions(this.props) }
			</select>
		);
	},

});


function renderOptions({min, max, value}) {
	let optionValues = rangeRight(Math.min(min, value), Math.max(value, max) + 1);
	// rangeRight excludes the maximum, so you need the +1 to get it in the array
	if (optionValues.length === 0) optionValues = [value];

	return optionValues.map((i) => (
		<option value={i} key={i}>
			{  (i < 0)  ?  (Math.abs(i)+'-')  :  i  }
		</option>
	));
};
