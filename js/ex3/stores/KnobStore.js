"use strict";

import * as knobActions from 'ex3/actions/KnobActions';
import { setState, replaceState } from './storeUtils';

const NUM_SECTORS = 12;
const SECTOR_RADS = Math.PI * 2 / NUM_SECTORS;


export default {

	listenables: knobActions,

	setState,
	replaceState,

	init: function() {
		this.replaceState({ isOn: false });
	},


	onStart: function(action) {
		const viewportCenter = {
			x: document.documentElement.clientWidth / 2,
			y: document.documentElement.clientHeight / 2,
		};
		const sector = getSector(viewportCenter, getTouchCoords(action.touch));

		this.replaceState({
			isOn: true,
			value: (action.value || 0),
			callback: action.callback,
			viewportCenter,
			sector,
		});
	},

	onAbort: function() {
		this.replaceState({ isOn: false });
	},

	onUpdate: function(action) {
		if (!this.state.isOn) return;

		const newSector = getSector(this.state.viewportCenter, getTouchCoords(action.touch));
		if (newSector === this.state.sector) return;

		const valDiff = getValueDiff(newSector, this.state.sector);

		console.log({
			oldSector: this.state.sector,
			newSector,
			oldVal: this.state.value,
			newVal: this.state.value + valDiff,
		});
		this.setState({
			sector: newSector,
			value: this.state.value + valDiff,
		});
	},

	onCommit: function() {
		if (!this.state.isOn) return;
		if (this.state.callback) this.state.callback(this.state.value);
		this.replaceState({ isOn: false });
	},

};


function getTouchCoords({clientX, clientY}) {
	return { x: clientX, y: clientY };
};

function getSector(refPoint, point) {
	const rads = getRads(refPoint, point);
	const sectorFloat = -rads / SECTOR_RADS;
	const sectorInt = Math.round(sectorFloat);
	return (sectorInt < 0) ? sectorInt + NUM_SECTORS : sectorInt;
};

function getRads(refPoint, point) {
	return Math.atan2(
		refPoint.y - point.y,
		point.x - refPoint.x );
};

function getValueDiff(newSector, oldSector) {
	var valueDiff = newSector - oldSector;
	if (valueDiff >   NUM_SECTORS / 2) valueDiff -=NUM_SECTORS;
	if (valueDiff <= -NUM_SECTORS / 2) valueDiff += NUM_SECTORS;
	return valueDiff;
};
