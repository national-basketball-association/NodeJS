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

// create a MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true });

//root route
router.get("/", function(req, res) {
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // find documents
    Database.findDocuments(db, function(docs) {
      res.render('template', { title: "Hey", message: "Hello"});
      console.log(docs);
      client.close();
    });
  });
});

module.exports = router
