// routes
var express = require("express"),
    router = express.Router();
    Database = require('../functions/mongoFunctions');

// MONGODB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dates = require('../common/date');

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
      Database.getPredictions(dbase, team_predictions, function(docs) {
        let predictions = [];
        docs.forEach(function(doc) {
            const prediction = doc.predictions[doc.predictions.length-1];
            const date = prediction["date"];
            if(dates.isDateNowOrLater(date)) {
                predictions.push(prediction);
            }
        });
        res.render('index', { predictions: predictions});
      });
    });
});

client.close();

module.exports = router
