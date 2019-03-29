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

// Collections names

// connect options
var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  useNewUrlParser: true
};

// create a MongoClient
const client = new MongoClient(uri, options);

//root route
router.get("/", function(req, res) {
    id1 = req.query.id1;
    id2 = req.query.id2;

    client.connect(function(err, db) {
      const dbase = client.db(dbName);
      
        Database.getBoxScores(dbase, "BOX_SCORES", id1, id2, function(docs, docs2) {          
            docs_data = docs[0].games[docs[0].games.length - 1];
            docs2_data = docs2[0].games[docs2[0].games.length - 1];

            console.log(docs2);
            team1_name = docs[0].TEAM_NAME;
            team2_name = docs2[0].TEAM_NAME;
            res.render("box/index", 
            {
                team1: docs_data,
                team2: docs2_data,
                t1_name: team1_name,
                t2_name: team2_name,
            });
      });
    });
});

client.close();

module.exports = router
