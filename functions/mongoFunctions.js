//save
const assert = require('assert');

module.exports = {
  findDocuments: function(db, collectionName, callback) {
    const collection = db.collection(collectionName);

    // Find all documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      // console.log(docs);
      callback(docs);
      console.log("exited");
    });
  },

  findByTeamName: function(db, collectionName, teamName, callback) {
    const collection = db.collection(collectionName);

    // Find specific documents
    collection.find({"teamName" : teamName}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found records");

      callback(docs);
    });
  },

  getPlayers: function(db, collectionName, callback) {
    const collection = db.collection(collectionName);

    // Get all players
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found records");

      callback(docs);
    });
  },

  getBoxScores: function(db, collectionName, id1, id2, callback) {
    const collection = db.collection(collectionName);

    collection.find({"_id" : id1}).toArray(function(err, docs) {
      assert.equal(err, null);

      collection.find({"_id" : id2}).toArray(function(err, docs2) {
        assert.equal(err, null);

        callback(docs, docs2);
      })
    });
  },

  getPredictions: function(db, collectionName, callback) {
    const collection = db.collection(collectionName);
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
    })
  },

  getTeamPredictions: function(db, collectionName, team_id, callback) {
    const collection = db.collection(collectionName);
    id = parseInt(team_id);
    collection.find({"_id" : id}).toArray(function(err, docs) {
      assert.equal(err, null);
      callback(docs);
    })
  }
};
