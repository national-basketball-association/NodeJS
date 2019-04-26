// routes
var express = require("express"),
    router = express.Router();
    Database = require('../functions/mongoFunctions');
    Dates = require('../common/date');
    Teams = require('../common/teams');

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
const box_scores = "BOX_SCORES";

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
    
    /* 
        send:
            - Box scores
            - Player stats
            - Team stats
            - Game predictions
            - Team information

    */
    client.connect(function(err, db) {
      const dbase = client.db(dbName);
      
      Database.findByTeamName(dbase, team_stats, req.params.id, function(docs) {
        console.log(docs)

        Database.getPlayers(dbase, player_stats, function(players) {
            curr_team_id = docs[0]._id            
            playersArr = {};
            i = 0;

            players.forEach(playerInfo => {
                if (playerInfo.seasons[0].TEAM_ID == curr_team_id) {                    
                    playersArr[i] = playerInfo.seasons
                    i += 1;
                }
            });
            
            Database.getTeamPredictions(dbase, team_predictions, curr_team_id, function(predicts) {                                
                // check if date is today
                latestPrediction = predicts[0].predictions[predicts[0].predictions.length - 1];                
                
                todayPredictions = Dates.isDateNow(latestPrediction.date);
                if (!todayPredictions) {
                    latestPrediction = {};
                }

                Database.getSingleTeamBoxScores(dbase, box_scores, curr_team_id, function(boxScores) {
                    // console.log(boxScores[0].games[boxScores[0].games.length - 1]);
                    lastGameBoxScore = boxScores[0].games[boxScores[0].games.length - 1];
                    team = Teams.getTeamById(curr_team_id);
                    res.render('teams/index', 
                    { 
                        predictions: latestPrediction,
                        team_id: docs[0]._id,
                        team_city: docs[0].teamCity, 
                        team_name: docs[0].teamName,
                        years: docs[0].years,
                        players_stats: playersArr,
                        lastGameBoxScore: lastGameBoxScore,
                        team: team
                    });
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