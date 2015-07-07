"use strict";

const reflux = require('reflux');
const React = require('react/addons');

const persistentCharacterStore = require('ex3/stores/PersistentCharacters');
const charActions = require('ex3/actions/CharActions');

const PersistentCharacterModel = require('ex3/models/PersistentCharacter');
const PersistentCharactersEditor = require('ex3/components/PersistentCharactersEditor');


charActions.load();

const demoInstance = React.render(
	<PersistentCharactersEditor persistentCharacters={persistentCharacterStore.persistentCharacters} />,
	document.getElementById("test")
);
persistentCharacterStore.listen((pcData) => {
	demoInstance.setProps(pcData)
});





// Create a store, plus actions, for ActiveCharacters


// Create a UI for adding characters

// Create a UI for rendering the current list of ActiveCharacters
