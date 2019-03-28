//save
const assert = require('assert');

module.exports = {
  findDocuments: function(db, callback) {
    const collection = db.collection('Teams');

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
  }
};
