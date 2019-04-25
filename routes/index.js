// routes
var express = require("express"),
    router = express.Router();
    Database = require('../functions/mongoFunctions');

// MONGODB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dates = require('../common/date');

const teams = require('../common/teams');

// connection URL
const uri = "mongodb+srv://rohanrao35:Npsnps407407@cluster0-8eolw.mongodb.net/test?retryWrites=true";

// Database name
const dbName = 'NPS';

// Collection names relevant to teams
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

//root route
router.get("/", function(req, res) {
    client.connect(function(err, db) {
      const dbase = client.db(dbName);
      let set = {}; //set of games
      Database.getPredictions(dbase, team_predictions, function(docs) {
        let predictions = [];
        docs.forEach(function(doc) {

          //fill out the prediction object
          let prediction = doc.predictions[doc.predictions.length-1];
          prediction["imgUrl"] = teams.getImage(doc._id);
          prediction["opponentImgUrl"] = teams.getImage(prediction["opponentId"]);
          prediction["route"] = teams.getRouteName(doc._id);
          prediction["opponentRoute"] = teams.getRouteName(prediction["opponentId"]);
          prediction["fullName"] = teams.getFullName(doc._id);

          let arr = [prediction["route"], prediction["opponentRoute"]].sort();
          arr = arr.join("");


          const date = prediction["date"];
          if(!set[arr]) {
            if(dates.isDateNowOrLater(date)) { //DELETE OR TRUE
              set[arr] = true;
              predictions.push(prediction);
            }
          }
          
        });
        res.render('index', { predictions: predictions});
      });
    });
});

client.close();

module.exports = router
