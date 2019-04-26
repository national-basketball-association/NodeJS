
var assert = require('assert');
// routes
var express = require("express"),
    router = express.Router();
    Database = require('./functions/mongoFunctions');

// MONGODB
const MongoClient = require('mongodb').MongoClient;


// connection URL
// const uri = "mongodb+srv://rohanrao35:Npsnps407407@cluster0-8eolw.mongodb.net/test?retryWrites=true";
const uri = "mongodb+srv://rmohamme:green12@cluster0-8eolw.mongodb.net/test?retryWrites=true";

// Database name
const dbName = 'NPS';

// Collection names relevant to teams
const team_stats = "TEAM_STATS";
const player_stats = "PLAYER_STATS";
const team_predictions = "TEAM_PREDICTIONS";
const client = new MongoClient(uri, options);

var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  useNewUrlParser: true
};

describe('tests', function(){
  // can nest more describe()'s here, or tests go here
  it('findByTeamName', function(){
    client.connect(function(err, db) {
      const dbase = client.db(dbName);
      Database.findByTeamName(dbase, team_stats, 'Warriors', function(docs) {
        // console.log(docs[0].teamName)
        id = docs[0]._id;
        assert.equal(docs[0].teamName, 'Warriors');
      });
      //process.exit();
    });
  });
  it('getPlayers', function(){
    client.connect(function(err, db) {
      // console.log("HERE YOU FUCKBOY\n\n\n")
      const dbase = client.db(dbName);
      Database.getPlayers(dbase, player_stats, function(players) {
        // console.log(players[0].playerName);
        // console.log(players[0].f_name);
        // console.log(players[0].l_name);
        // console.log(players[0].f_name + '_' + players[0].l_name);
        assert.equal(players[0].f_name + '_' + players[0].l_name, players[0].playerName);
      });
      //process.exit();
    });
  });
  it('getTeamPredictions', function(){
    client.connect(function(err, db) {

      const dbase = client.db(dbName);
      Database.findByTeamName(dbase, team_stats, 'Warriors', function(docs) {
        console.log("HEREEEEE\n\n")
        Database.getTeamPredictions(dbase, team_predictions, docs[0]._id, function(predicts) {
          // console.log(predicts[0].full_name.includes("Warriors"));

          assert.equal(predicts[0].full_name.includes("Warriors"), true)


        });
      });
    });
  });

  /////////////////////
  it('getPredictions', function(){
    client.connect(function(err, db) {

      const dbase = client.db(dbName);
      Database.findByTeamName(dbase, team_stats, 'Warriors', function(docs) {
        Database.getPredictions(dbase, team_predictions, function(docs) {
        // console.log(players[0].playerName);
        // console.log(players[0].f_name);
        // console.log(players[0].l_name);
        // console.log(players[0].f_name + '_' + players[0].l_name);
        var j = -1;
        for(var i = 0; i < docs.length; i++){
          if(docs[i].full_name.includes("Warriors")){
            j = i;
            break;
          }
        }
        // console.log(j)
        if(j > -1){
          // console.log(docs[j].full_name)
          assert.equal(docs[j].full_name.includes("Warriors"), true);
        }
        });
      //process.exit();
      });
    });
  });
  // it('getBoxScores', function(){
  //   client.connect(function(err, db) {
  //
  //     const dbase = client.db(dbName);
  //
  //     Database.getBoxScores(dbase, "BOX_SCORES", id1, id2, function(docs, docs2) {
  //       // console.log(players[0].playerName);
  //       // console.log(players[0].f_name);
  //       // console.log(players[0].l_name);
  //       // console.log(players[0].f_name + '_' + players[0].l_name);
  //       var j = -1;
  //       for(var i = 0; i < docs.length; i++){
  //         if(docs[i].full_name.includes("Warriors")){
  //           j = i;
  //           break;
  //         }
  //       }
  //       // console.log(j)
  //       if(j > -1){
  //         // console.log(docs[j].full_name)
  //         assert.equal(docs[j].full_name.includes("Warriors"), true);
  //       }
  //     });
  //     //process.exit();
  //   });
  // });
});
