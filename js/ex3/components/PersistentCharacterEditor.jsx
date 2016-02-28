"use strict";

import React from 'react/react';
import charActions from 'ex3/actions/CharActions';

require('./PersistentCharacterEditor.less');


export default React.createClass({
	render: function() {
		let pc = this.props.persistentCharacter;

		return (
			<div className="PersistentCharacterEditor clearfix">
				<div className="portrait"
					onDragEnter={allowDropIfHasUri}
					onDragOver={allowDropIfHasUri}
					onDrop={this._portraitImageOnDrop}
					style={ {
						width: 200,
						height: 200,
						backgroundImage: `url(${pc.imgUrl})`,
						backgroundSize: "cover",
						backgroundPositionX: "50%",
						backgroundPositionY: "50%",
					}}
				/>

				<div className="input-label">Name:</div>
				<input type="text"
					value={pc.name}
					onChange={this._nameOnChange}
					/>

				<div className="input-label">Portrait URL:</div>
				<input type="text"
					value={pc.imgUrl}
					onChange={this._portraitUrlOnChange}
					/>

				<div>
					<button className="remove btn btn-xs btn-danger" onClick={this._removeOnClick}>Remove</button>
				</div>
			</div>
		);
	},

	_nameOnChange: function(evt) {
		charActions.setName({
			who: this.props.persistentCharacter,
			name: evt.target.value,
		});

		this.forceUpdate();
	},

	_portraitImageOnDrop: function(evt) {
		evt.preventDefault();
		if (!hasUri(evt)) return;
		// TODO: Extract images from HTML?
		// TODO: Extract data from files? http://www.htmlgoodies.com/html5/javascript/drag-files-into-the-browser-from-the-desktop-HTML5.html#fbid=fA8mNhDY0NY

		charActions.setPortrait({
			who: this.props.persistentCharacter,
			url: evt.dataTransfer.getData("text/uri-list"),
		});

		this.forceUpdate();
	},

	_portraitUrlOnChange: function(evt) {
		charActions.setPortrait({
			who: this.props.persistentCharacter,
			url: evt.target.value,
		});

		this.forceUpdate();
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
	return evt.dataTransfer.types.indexOf("text/uri-list") >= 0;
};
