import Promise from 'bluebird';


// Wait for GA to load, or give up after a while ///////////////////////////////////////////////////////////////////////

var gaLoaded = new Promise((resolve) => {
	const giveUpOnGATimeout = setTimeout(() => {
		resolve( function() { /*do nothing*/ } );
		clearTimeout(giveUpOnGATimeout);
		clearInterval(findGAInterval);
	}, 30000);

	const findGAInterval = setInterval(() => {
		if (window.ga) {
			resolve( window.ga );
			clearTimeout(giveUpOnGATimeout);
			clearInterval(findGAInterval);
		}
	}, 500);
});


// Expose interface for delayed GA stuff ///////////////////////////////////////////////////////////////////////////////

export default function(...stuff) {
	gaLoaded.then((ga) => {
		ga('send', 'event', ...stuff);
	})
}