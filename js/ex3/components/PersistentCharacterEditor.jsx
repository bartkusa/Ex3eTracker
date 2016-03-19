"use strict";

import React from 'react/react';
import Portrait from 'ex3/components/Portrait';
import PersistentCharShape from 'ex3/shapes/PersistentCharacter';

import charActions from 'ex3/actions/CharActions';
import gaEvent from 'ex3/funcs/ga';

import { DEFAULT_IMAGE_URL } from 'ex3/stores/PersistentCharacters';
require('./PersistentCharacterEditor.less');


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
						onDragEnter={allowDropIfHasUri}
						onDragOver={allowDropIfHasUri}
						onDrop={this._portraitImageOnDrop}
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

					<div className="input-label" style={{clear: "right"}}>Notes</div>
					<textarea
							className="notes"
							onChange={this._notesOnChange}
							placeholder="Eg: health levels, defense, soak"
							rows="4"
							value={pc.notes}
							/>

					<div>
					</div>
				</div>
			</div>
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
		gaEvent('persistent-characters', 'set-portrait-dragdrop', url)
	},

	_portraitUrlOnChange: function(evt) {
		charActions.setPortrait({
			who: this.props.persistentCharacter,
			url: evt.target.value,
		});
	},

	_portraitUrlOnFocus: function(evt) {
		this.refs.portraitUrl.setSelectionRange(0, this.props.persistentCharacter.imgUrl.length);
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
});


function allowDropIfHasUri(evt) {
	let hadUri = hasUri(evt);
	if (hadUri) evt.preventDefault();
	return hadUri;
};
function hasUri(evt) {
	return Array.from( evt.dataTransfer.types ).indexOf("text/uri-list") >= 0;
};
