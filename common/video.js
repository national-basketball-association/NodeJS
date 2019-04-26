//get video source at random

const sources = [
	'https://giant.gfycat.com/ThunderousAppropriateInvisiblerail.webm',
	'https://giant.gfycat.com/EnlightenedUnrealisticCoyote.webm',
	'https://giant.gfycat.com/TartDecentBernesemountaindog.webm',
	'https://giant.gfycat.com/VictoriousEachDeinonychus.webm',
	'https://giant.gfycat.com/DisastrousOblongEthiopianwolf.webm',
	'https://giant.gfycat.com/ElatedDefensiveIsabellinewheatear.webm'
]
function getVideo() {
	return sources[Math.floor(Math.random()*sources.length)];
}

module.exports = {getVideo};