// routes
var express = require("express"),
    router = express.Router();
    Database = require('../functions/mongoFunctions');

// MONGODB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// connection URL
const uri = "mongodb+srv://rohanrao35:Npsnps407407@cluster0-8eolw.mongodb.net/test?retryWrites=true";

// Database name
const dbName = 'NPS';

// Collection names relevant to teams
const team_predictions = "TEAM_PREDICTIONS";

//Teams meta Database
const teams = require('../common/teams');


//helper date functions
const dates = require('../common/date')

// connect options
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  useNewUrlParser: true
};

// create a MongoClient
// const client = new MongoClient(uri, { useNewUrlParser: true });
const client = new MongoClient(uri, options);

//root route
router.get("/:id", function(req, res) {
    client.connect(function(err, db) {
      const dbase = client.db(dbName);
      const teamId = teams.getTeamId(req.params.id);
      if(!teamId) {
        throw "team is not found";
      }
      Database.getTeamPredictions(dbase, team_predictions, teamId, function(docs) {
        const team = teams.getTeamById(teamId);
        const latestPrediction = docs[0].predictions[docs[0].predictions.length-1];
        if(!latestPrediction) {
          res.render('predictions/index', { data: undefined});
        } else {
          let date = latestPrediction["date"];


          const futureGame = dates.isDateNowOrLater(date);
          const opponentTeam = teams.getTeamById(latestPrediction["opponentId"]);
          const data = {
            data: (futureGame) ? latestPrediction : undefined,
            team: team,
            opponentTeam: opponentTeam
          }
          res.render('predictions/index', data);
        }
      });
    });
});

client.close();

module.exports = router
