import React from 'react/react';
import IntegerSelect from 'ex3/components/IntegerSelect';

import battleActions from 'ex3/actions/BattleActions';
import combatantShape from 'ex3/shapes/Combatant';

import gaEvent from 'ex3/funcs/ga';
import makeKnobHandlers from 'ex3/funcs/knobHandlers';

require('./Essence.less');
require('style/centeredInputBlock.less');
require('style/noLongPress.less');


export default React.createClass({

	propTypes: {
		className: React.PropTypes.string,
		combatant: combatantShape.isRequired,
	},

	render: function() {
		const c = this.props.combatant;
		const hasEssence = c.maxPersonalEss > 0 || c.maxPeripheralEss > 0;
		const classNames = `Essence centeredInputBlock noLongPress  ${hasEssence ? '' : 'invisible'} ${this.props.className || ''}`;

		return (
			<div className={classNames}>

				<div {...makeKnobHandlers(c.personalEss, this._personalEssOnChange)}>
					<IntegerSelect
							className="big"
							disabled={c.maxPersonalEss <= 0}
							min={0} max={c.maxPersonalEss}
							onChange={c.maxPersonalEss && this._personalEssOnChange}
							value={c.personalEss}
							/>
					<div><i>Personal</i></div>
				</div>
			
				<div {...makeKnobHandlers(c.peripheralEss, this._peripheralEssOnChange)}>
					<IntegerSelect
							className="big"
							disabled={c.maxPeripheralEss <= 0}
							min={0} max={c.maxPeripheralEss}
							onChange={this._peripheralEssOnChange}
							value={c.peripheralEss}
							/>
					<div><i>Peripheral</i></div>
				</div>

			</div>
		);
	},

	_personalEssOnChange: function(newValue) {
		battleActions.setEssence({
			who: this.props.combatant.id,
			personal: newValue,
		});
		gaEvent('battle', 'combatant-essence-personal', undefined, newValue - this.props.combatant.personalEss);
	},

	_peripheralEssOnChange: function(newValue) {
		battleActions.setEssence({
			who: this.props.combatant.id,
			peripheral: newValue,
		});
		gaEvent('battle', 'combatant-essence-peripheral', undefined, newValue - this.props.combatant.peripheralEss);
	},
});
