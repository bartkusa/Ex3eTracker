"use strict";

import React from 'react/react';
import Portrait from 'ex3/components/Portrait';
import IntegerSelect from 'ex3/components/IntegerSelect';
import PersistentCharShape from 'ex3/shapes/PersistentCharacter';

import charActions from 'ex3/actions/CharActions';
import gaEvent from 'ex3/funcs/ga';
import makeKnobHandlers from 'ex3/funcs/knobHandlers';
import truncate from 'ex3/funcs/truncate';

import { DEFAULT_IMAGE_URL } from 'ex3/stores/PersistentCharacters';
require('./PersistentCharacterEditor.less');

const ESSENCE_RANGE = 20;
const IS_FILE_READING_SUPPORTED = (typeof FileReader !== 'undefined');


export default React.createClass({

	propTypes: {
		persistentCharacter: PersistentCharShape.isRequired,
	},

	render: function() {
		let pc = this.props.persistentCharacter;

		return (
			<div className="PersistentCharacterEditor clearfix">
				<div className="portraitBox">
					<Portrait
						imgUrl={pc.imgUrl}
						imgPosX={pc.imgPosX}
						imgPosY={pc.imgPosY}
						onClick={this._portraitOnClick}
						onDragEnter={allowDropIfHasUri}
						onDragOver={allowDropIfHasUri}
						onDrop={this._portraitImageOnDrop}
						onMouseDown={this._portraitOnMouseDown}
						onMouseMove={this._portraitOnMouseMove}
						onMouseUp={this._portraitOnMouseUp}
						onTouchStart={this._portraitOnTouchStart}
						onTouchMove={this._portraitOnTouchMove}
						onTouchEnd={this._portraitOnTouchEnd}
						/>
					<div>
						<button className="remove btn btn-xs btn-danger" onClick={this._removeOnClick}>Delete</button>
					</div>
				</div>

				<div className="fields">
					<div className="input-label">Character Name</div>
					<input type="text"
						value={pc.name}
						onChange={this._nameOnChange}
						/>

					<div className="input-label">Portrait URL</div>
					<input type="text"
						value={pc.imgUrl}
						onChange={this._portraitUrlOnChange}
						onFocus={this._portraitUrlOnFocus}
						ref="portraitUrl"
						/>
					{ this._renderPortraitUploadButton() }

					<div className="input-label">Essence Reserves</div>
					<div className="essenceBlock"
							{...makeKnobHandlers(pc.personalEss, this._personalEssOnChange)}
							>
						<i>Personal</i>{" "}
						<IntegerSelect
							className="big"
							min={0}
							max={pc.personalEss + ESSENCE_RANGE}
							onChange={this._personalEssOnChange}
							required={true}
							value={pc.personalEss}
							/>
					</div>
					<div className="essenceBlock"
							{...makeKnobHandlers(pc.peripheralEss, this._peripheralEssOnChange)}
							>
						<i>Personal</i>{" "}
						<IntegerSelect
							className="big"
							min={0}
							max={pc.peripheralEss + ESSENCE_RANGE}
							onChange={this._peripheralEssOnChange}
							required={true}
							value={pc.peripheralEss}
							/>
					</div>

					<div className="input-label" style={{clear: "right"}}>Notes</div>
					<textarea
							className="notes"
							onChange={this._notesOnChange}
							placeholder="Eg: health levels, defense, soak"
							rows="4"
							value={pc.notes}
							/>
				</div>
			</div>
		);
	},

	_renderPortraitUploadButton: function() {
		if (!IS_FILE_READING_SUPPORTED) return <noscript />;

		const pc = this.props.persistentCharacter;
		const htmlId = `uploadPortrait${pc.id}`;

		return (
			<span>
				{" "}
				<input className="hideFileInput"
						name={htmlId}
						id={htmlId}
						onChange={ this._handleUploadPortrait }
						type="file"
						/>
				<label className="portraitUploadLabel btn btn-xs btn-default"
						htmlFor={htmlId}
						>
					Upload a picture
				</label>
			</span>
		);
	},

	_nameOnChange: function(evt) {
		charActions.setName({
			who: this.props.persistentCharacter,
			name: evt.target.value,
		});
	},

	_portraitImageOnDrop: function(evt) {
		evt.preventDefault();
		if (!hasUri(evt)) return;
		// TODO: Extract images from HTML?
		// TODO: Extract data from files? http://www.htmlgoodies.com/html5/javascript/drag-files-into-the-browser-from-the-desktop-HTML5.html#fbid=fA8mNhDY0NY

		const url = evt.dataTransfer.getData("text/uri-list");
		charActions.setPortrait({
			who: this.props.persistentCharacter,
			url,
		});
		gaEvent('persistent-characters', 'set-portrait-dragdrop', url);
	},

	_portraitOnMouseDown: function(evt) {
		console.log("down");
		this._firePortraitCenterAction(evt);
		this._isSettingFocus = true;
	},

	_portraitOnMouseMove: function(evt) {
		if (this._isSettingFocus) this._firePortraitCenterAction(evt);
	},

	_portraitOnMouseUp: function(evt) {
		this._isSettingFocus = false;
		gaEvent('persistent-characters', 'set-portrait-focus');
	},

	_portraitOnTouchStart: function(evt) {
		evt.preventDefault();
		this._portraitOnMouseDown(evt);
	},

	_portraitOnTouchMove: function(evt) {
		if (this._isSettingFocus) this._portraitOnMouseMove(evt);
	},

	_portraitOnTouchEnd: function(evt) {
		if (this._isSettingFocus) this._portraitOnMouseUp(evt);
	},

	_portraitUrlOnChange: function(evt) {
		charActions.setPortrait({
			who: this.props.persistentCharacter,
			url: evt.target.value,
		});
		gaEvent('persistent-characters', 'set-portrait-typing');
	},

	_portraitUrlOnFocus: function(evt) {
		this.refs.portraitUrl.setSelectionRange(0, this.props.persistentCharacter.imgUrl.length);
	},

	_handleUploadPortrait: function(evt) {
		const portraitFile = (evt.target.files || [])[0];
		if (!portraitFile) console.error("Couldn't load file.");

		const fileReader = new FileReader();
		fileReader.onload = (portraitLoadEvent) => {
			charActions.setPortrait({
				who: this.props.persistentCharacter,
				url: portraitLoadEvent.target.result,
			});
			gaEvent('persistent-characters', 'set-portrait-upload', null, portraitLoadEvent.target.result.length);
		};
		fileReader.readAsDataURL(portraitFile);
	},

	_personalEssOnChange: function(newValue) {
		charActions.setEssence({
			who: this.props.persistentCharacter,
			personal: newValue,
		});
		gaEvent('persistent-characters', 'set-personal-essence', null, newValue);
	},

	_peripheralEssOnChange: function(newValue) {
		charActions.setEssence({
			who: this.props.persistentCharacter,
			peripheral: newValue,
		});
		gaEvent('persistent-characters', 'set-peripheral-essence', null, newValue);
	},

	_notesOnChange: function(evt) {
		charActions.setNotes({
			who: this.props.persistentCharacter,
			notes: evt.target.value,
		})
	},

	_removeOnClick: function(evt) {
		charActions.remove( this.props.persistentCharacter );
	},

	_firePortraitCenterAction: function(evt) {
		const portraitNode = evt.target;

		const {pageX, pageY} = (evt.targetTouches)
			? evt.targetTouches[0]
			: evt;

		const xPx = pageX - portraitNode.offsetLeft;
		const yPx = pageY - portraitNode.offsetTop;

		charActions.setPortraitCenter({
			who:  this.props.persistentCharacter,
			imgPosX: truncate(100 * xPx / portraitNode.clientWidth),
			imgPosY: truncate(100 * yPx / portraitNode.clientHeight),
		});
	},
});


function allowDropIfHasUri(evt) {
	let hadUri = hasUri(evt);
	if (hadUri) evt.preventDefault();
	return hadUri;
};
function hasUri(evt) {
	return Array.from( evt.dataTransfer.types ).indexOf("text/uri-list") >= 0;
};
