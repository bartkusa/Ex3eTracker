require([
	  "react/react"
	, "ex3/Character"
	, "ex3/ActiveCharacter"
	, "jsx!ex3ui/Character"
], function(
	  React
	, Character
	, ActiveCharacter
	, CharUi
) {
	var dude = new Character({
		name: "Steve McQueen"
	});
	var activeDude = new ActiveCharacter(dude);

	React.renderComponent(
		<CharUi char={activeDude} />,
		document.getElementById("test")
	);
});