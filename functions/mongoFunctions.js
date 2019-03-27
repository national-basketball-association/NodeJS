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
  }
};
