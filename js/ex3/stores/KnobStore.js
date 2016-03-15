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
			originalValue: (action.value || 0),
			value: (action.value || 0),
			callback: action.callback,
			viewportCenter,
			sector,
			sectors: NUM_SECTORS,
		});
	},

	onAbort: function() {
		this.replaceState({ isOn: false });
	},

	onUpdate: function(action) {
		if (!this.state.isOn) return;
		const touchCoords = getTouchCoords(action.touch);

		if (isOverAbortSector(this.state.viewportCenter, touchCoords)) {
			this.setState({
				isOverAbortSector: true,
			});
			return;
		}

		const newSector = getSector(this.state.viewportCenter, touchCoords);
		if (newSector === this.state.sector) return;

		const valDiff = getValueDiff(newSector, this.state.sector);

		this.setState({
			sector: newSector,
			value: this.state.value + valDiff,
			isOverAbortSector: false,
		});
	},

	onCommit: function() {
		if (!this.state.isOn) return;
		if (this.state.callback && !this.state.isOverAbortSector) {
			this.state.callback(this.state.value);
		}
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

function isOverAbortSector(screenCenter, point) {
	const {x, y} = getCoordsDiff(screenCenter, point);
	return Math.abs(y) < 50 && Math.abs(x) < 75;
};
function getCoordsDiff(refPoint, point) {
	return {
		x: point.x - refPoint.x,
		y: refPoint.y - point.y,
	};
};
