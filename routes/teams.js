// routes
var express = require("express"),
    router = express.Router();
    Database = require('../functions/mongoFunctions');

// MONGODB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// connection URL
// const uri = "mongodb+srv://rohanrao35:Npsnps407407@cluster0-8eolw.mongodb.net/test?retryWrites=true";
const uri = "mongodb+srv://rmohamme:green12@cluster0-8eolw.mongodb.net/test?retryWrites=true";

// Database name
const dbName = 'NPS';

// Collection names relevant to teams
const team_stats = "TEAM_STATS";
const player_stats = "PLAYER_STATS";
const team_predictions = "TEAM_PREDICTIONS";

// connect options
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  useNewUrlParser: true
};

// create a MongoClient
// const client = new MongoClient(uri, { useNewUrlParser: true });
const client = new MongoClient(uri, options);

// team specific route
router.get("/:id", function(req, res) {
    console.log(req.params.id);
    client.connect(function(err, db) {
      // console.log(db);
      const dbase = client.db(dbName);
      // console.log(dbase);
      Database.findByTeamName(dbase, team_stats, req.params.id, function(docs) {
        // console.log(docs[0].years);

        Database.getPlayers(dbase, player_stats, function(players) {
          console.log(players[0].seasons.length)
          // len = players[0].seasons.length
          // console.log(len)
          console.log(players[0].seasons[0].TEAM_ID)
          curr_team_id = docs[0]._id

          Database.getTeamPredictions(dbase, team_predictions, curr_team_id, function(predicts) {
            console.log(predicts);
            res.render('teams/index', 
            { 
              predictions: predicts,
              team_id: docs[0]._id,
              team_city: docs[0].teamCity, 
              team_name: docs[0].teamName,
              years: docs[0].years,
              players_stats: players
            });
          });              
        });
      });
    });  
});

// root route
router.get("/", function(req, res) {
    client.connect(function(err, db) {
      // console.log(db);
      const dbase = client.db(dbName);
      // console.log(dbase);
      Database.findDocuments(dbase, function(docs) {
        console.log(docs);
        res.render('teams/index', { title: "Hey", message: "Hello"});
      });
    });
});

client.close();

module.exports = router