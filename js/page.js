require([
	  "ex3/consts"
	, "ex3/Attack"
	, "ex3/Parry"
	, "ex3/Weapon"
	, "ex3/Armor"
	, "ex3/Character"
	, "ex3/ActiveCharacter"
	, "ex3/ActiveGame"
], function(
	  ex3c
	, Attack
	, Parry
	, Weapon
	, Armor
	, Character
	, ActiveCharacter
	, ActiveGame
) {
	var basicAttack = new Attack({
		name: "Stab",
		accuracy: 4,
		damage: 9
	});
	var basicParry = new Parry({
		bonus: 1
	});
	var basicWeapon = new Weapon({
		name: "Spear",
		attacks: [basicAttack],
		parries: [basicParry],
		tags: ["reach"]
	});


	var lightArmor = new Armor({
		name: "Leather Armor",
		soak: 2
	});
	var heavyArmor = new Armor({
		name: "Lookshy Plate",
		soak: 8,
		mobilityPenalty: -2
	});


	var _knight = new Character({
		name: "Blood Thunder",
		imgUrl: "/ex/img/charKnight.jpg",
		maxPersonalMotes: 13,
		maxPeripheralMotes: 29
	});
	var knight = new ActiveCharacter({
		platonicCharacter: _knight,
		initiative: 3,
		motes: 30,
		equipment: {
			armor: heavyArmor
		}
	});

	
	var _monk = new Character({
		name: "Eight Willows Condemnation",
		imgUrl: "/ex/img/charMonk.jpg",
		maxPersonalMotes: 7,
		maxPeripheralMotes: 22
	});
	var monk = new ActiveCharacter({
		platonicCharacter: _monk,
		initiative: 1,
		motes: 0,
		hasGoneThisRound: true
	});

	
	var _desert = new Character({
		name: "Steve McQueen",
		imgUrl: "/ex/img/charDesert.jpg"
	});
	var desert = new ActiveCharacter({
		platonicCharacter: _desert,
		initiative: -4,
		equipment: {
			armor: lightArmor,
			weapon: new Weapon.Light({name: "Saber"})
		}
	});

	
	var _samurai = new Character({
		name: "Bai-Luo Seven Strides",
		imgUrl: "/ex/img/charSamurai.jpg"
	});
	var samurai= new ActiveCharacter({
		platonicCharacter: _samurai,
		initiative: 10,
		damage: { bashing: 4, lethal: 4 }
	});

	
	var _captain = new Character({
		name: "La Capitana",
		imgUrl: "/ex/img/charEmpress.jpg",
		maxPersonalMotes: 10,
		maxPeripheralMotes: 10
	});
	var captain= new ActiveCharacter({
		platonicCharacter: _captain,
		initiative: 3,
		damage: { bashing: 3, lethal: 1 }
	});

	
	var game = new ActiveGame({
		characters: [samurai, desert, monk, knight, captain]
	});

	window.gameModel = game;
	window.gameUi = React.renderComponent(
		ex3ui.CharacterList({
			game: game
		}),
		document.getElementById("test")
	);

	gameModel.nextUp();
	gameUi.setProps({game: gameModel})
});