'use strict'

module.exports = (app) => {
	app.get('/', (req, res) => {
		console.log("testing index route");
		res.send('hello');		
	});

	//gets statistics about a NBA player
	app.get('/getplayer', (req, res) => {
		//TODO
	});
		

	//gets statistics about a NBA team
	app.get('/getteam', (req, res) => {
		//TODO
	});
};
