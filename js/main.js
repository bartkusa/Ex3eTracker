"use strict";

import { mix } from 'ex3/funcs/utils';
import Promise from 'bluebird';

import { createStore } from 'reflux';
import { default as PersistentCharacterStore } from 'ex3/stores/PersistentCharacters';
import KnobStore from 'ex3/stores/KnobStore';
import BattleStore from 'ex3/stores/BattleStore';

import React from 'react/react';
import ReactDOM from 'react/lib/ReactDOM';
import MainUi from 'ex3/components/MainUi';


require('./main.less');
require('./suppressBootstrapDemo.less');


Promise.config({
    longStackTraces: true,
    warnings: true
});


// Init stores ---------------------------------------------------------------------------------------------------------

const pcStore = createStore( PersistentCharacterStore );
const batStore = createStore( mix(
		BattleStore,
		{ persistentCharacterStore: pcStore }
));
const knobStore = createStore( KnobStore );

pcStore.loadDuringStartup();


// Init UI -------------------------------------------------------------------------------------------------------------

const rootNode = document.getElementById("test");

function renderApp() {
	ReactDOM.render(
		(<MainUi
				persistentCharacters={ pcStore.state.persistentCharacters }
				areUnsavedChanges={ pcStore.state.areUnsavedChanges }
				battle={ batStore.state }
				knob={ knobStore.state }
				/>),
		rootNode
	)
};
renderApp();

[
	pcStore,
	batStore,
	knobStore,
].forEach(store => {
	store.listen(renderApp);
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
