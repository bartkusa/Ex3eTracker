"use strict";

let reflux = require('reflux');
let React = require('react/addons');

let persistentCharacterStore = require('ex3/stores/PersistentCharacters');
let charActions = require('ex3/actions/CharActions');

let PersistentCharacterModel = require('ex3/models/PersistentCharacter');
let PersistentCharactersEditor = require('ex3/components/PersistentCharactersEditor');


let spoofedPersistents = [{
	name: "Adam",
	willpower: 3,
}, {
	name: "Uma"
}, {
	name: "Sachen",
	willpower: 7,
}, {
	name: "Kima",
	essence: 1,
	personalMotes: 13,
	peripheralMotes: 29,
}].map((pc) => new PersistentCharacterModel(pc));
charActions.add(spoofedPersistents);

let demoInstance = React.render(
	<PersistentCharactersEditor persistentCharacters={persistentCharacterStore.persistentCharacters} />,
	document.getElementById("test")
);
persistentCharacterStore.listen((pcData) => {
	demoInstance.setProps(pcData)
});





// Create a store, plus actions, for ActiveCharacters


// Create a UI for adding characters

// Create a UI for rendering the current list of ActiveCharacters
