
var assert = require('assert');
// routes
var express = require("express"),
    router = express.Router();
    Database = require('../functions/mongoFunctions');

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
  it('findByTeamName', function(done){
    client.connect(function(err, db) {
      const dbase = client.db(dbName);
      Database.findByTeamName(dbase, team_stats, 'Warriors', function(docs) {
        id = docs[0]._id;
        assert.equal(docs[0].teamName, 'Warriors');
        done();
      });
    });
  });
  // it('getPlayers', function(done){
  //   client.connect(function(err, db) {
  //     const dbase = client.db(dbName);
  //     Database.getPlayers(dbase, player_stats, function(players) {
  //       assert.equal(players[0].f_name + '_' + players[0].l_name, players[0].playerName);
  //       done();
  //     });
  //   });
  // }); //uncomment this part out
  it('getTeamPredictions', function(done){
    client.connect(function(err, db) {

      const dbase = client.db(dbName);
      Database.findByTeamName(dbase, team_stats, 'Warriors', function(docs) {
        Database.getTeamPredictions(dbase, team_predictions, docs[0]._id, function(predicts) {

          assert.equal(predicts[0].full_name.includes("Warriors"), true)
          done();

        });
      });
    });
  });

  it('getPredictions', function(done){
    client.connect(function(err, db) {
      const dbase = client.db(dbName);
      Database.findByTeamName(dbase, team_stats, 'Warriors', function(docs) {
        Database.getPredictions(dbase, team_predictions, function(docs) {
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
          done();
        }
        });
      //process.exit();
      });
    });
  });

  //betting odds functionality
  const odds = require('../common/betting');
  it('getBettingOdds', function(done) {
    odds.getBettingOdds(client, function(docs) {
      //check the length
      assert.equal(docs.length != 0, true);
      done();
    });
  });

  it('bettingOddsValues', function(done) {
    odds.getBettingOdds(client, function(docs) {
      //has the correct value types
      const team = docs[0];
      assert.equal(team["team1"] != undefined, true);
      assert.equal(team["team2"] != undefined, true);
      assert.equal(team["val1"] != undefined, true);
      assert.equal(team["val2"] != undefined, true);
      assert.equal(Number.isInteger(team["val1"]), true);
      assert.equal(Number.isInteger(team["val2"]), true);
      done();
    });
  });

  //date parsing functionality
  // const Dates = require('../common/date');
  // it('isTodayToday', function(done) {
    
  // });

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
