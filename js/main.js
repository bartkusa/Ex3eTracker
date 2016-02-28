"use strict";

require('./main.less');
require('./suppressBootstrapDemo.less');

import React from 'react/react';
import ReactDOM from 'react/lib/ReactDOM';
import MainUi from 'ex3/components/MainUi';

import persistentCharacterStore from 'ex3/stores/PersistentCharacters';
import bonkers from 'ex3/stores/PersistentCharacters';


// Init stores ---------------------------------------------------------------------------------------------------------

persistentCharacterStore.onLoad(); // fire action instead?


// Init UI -------------------------------------------------------------------------------------------------------------

const rootNode = document.getElementById("test");

ReactDOM.render(
	(<MainUi
			persistentCharacters={ persistentCharacterStore.state.persistentCharacters }
			/>),
	rootNode
);

persistentCharacterStore.listen((storeState) => {
	ReactDOM.render(
		(<MainUi
				persistentCharacters={ persistentCharacterStore.state.persistentCharacters }
				/>),
		rootNode
	);
});




// Create a store, plus actions, for ActiveCharacters


// Create a UI for adding characters

// Create a UI for rendering the current list of ActiveCharacters



/// christ im lost. what the fuck was i doing....
// ok new game plan
// 1. there are permanent characters
// 2. give them a name, a face, and basic persistence load/save
// 3. there are instance characters
// 4. they have initiative. that's it. start with that. no persistence.
// 5. allow user to change inititiative, count rounds, etc. init only. other stats after that.
