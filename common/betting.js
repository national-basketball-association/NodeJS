const betting_odds = "BETTING_ODDS";

// Database name
const dbName = 'NPS';

const Database = require('../functions/mongoFunctions');

function getBettingOdds(client, callback) {
	client.connect(function(err, db) {
		const dbase = client.db(dbName);
		Database.getBettingOdds(dbase, betting_odds, function(docs) {
			callback(docs);
		});
	});
}

module.exports = {getBettingOdds};