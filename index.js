'use strict'

var options = {
  datfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

// variables
let express = require('express');
let app = express();
const pug = require('pug');

// set view engine
app.set('view engine', 'pug');

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')

//connection URL
const uri = "mongodb+srv://rohanrao35:Npsnps407407@cluster0-8eolw.mongodb.net/test?retryWrites=true";

// Database Name
const dbName = 'NPS';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true });

// TODO: I have a mongoClient object, connect to the database and return the db
// connect to db
  //  in callback get all documents
    // in callback to that funciton res.render
    // then close connections

// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected Successfully to server");
//   const db = client.db(dbName);
//
//   app.get('/', function(req, res) {
//     findDocuments(db, function(docs) {
//       res.render('template', {title: "Hey", message: "Hello!"});
//       console.log(docs);
//       client.close();
//     });
//   });
// });

app.get('/', function(req, res) {

  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected Successfully to server");

    const db = client.db(dbName);

    // find documents
    findDocuments(db, function(docs) {
      res.render('template', {title: "Hey", message: "Hello"});
      console.log(docs);
      client.close();
    });
  });

});


const findDocuments = function(db, callback) {
  const collection = db.collection('Teams');

  // Find all documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}

function getDocuments (db, callback) {
  //connection is already established
  const collection = db.collection('Teams');

  //find all documents
  colelctions.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  })
}

// listening PORT
app.listen(8080)


// let app = express();
// app.set('view engine', 'pug');
//
// var path = require('path');
// const pug = require('pug');
//
// var publicDir = path.join(__dirname, 'Test');
//
// app.get('/', function(req, res) {
//   client.connect(err => {
//     const collection = client.db("NPS").collection("Teams");
//     console.log(collection.name);
//   })
//
//   res.render('template', {title: "Hey", message: "Hello There!"})
//   // res.sendFile(path.join(publicDir, 'index.html'));
//   // const compiledFunction = pug.compileFile('Test/template.pug');
//   // console.log(compiledFunction({
//   //   name: 'Timothy'
//   // }));
// });
//
// app.use('/', express.static(publicDir, options))
// app.listen(8080);


// let PORT = process.env.PORT || 3000;
// //let stats = require('./routes/stats') (app);
//
// app.listen(PORT, function () {
//   console.log('App listening on port 3000!');
// });


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://rohanrao35:Npsnps407407@cluster0-8eolw.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
// const collection = client.db("NPS").collection("Teams");
// // perform actions on the collection object
// collection.insertOne({'ID': 40, 'Location': 'aa'})
// client.close();
// });





// app.get('/', function(req, res){
//   res.send("Hello World!");
// });



  // const MongoClient = require('mongodb').MongoClient;
  // const uri = "mongodb+srv://rohanrao35:Npsnps407407@cluster0-8eolw.mongodb.net/test?retryWrites=true";
  // const client = new MongoClient(uri, { useNewUrlParser: true });
  // client.connect(err => {
  // const collection = client.db("NPS").collection("Teams");
  // // perform actions on the collection object
  // collection.insertMany([
  //     {'ID': 60},
  //     {'ID': 61},
  //     {'ID': 62},
  //     {'ID': 63},
  //     {'ID': 64}
  //   ])
  // //console.log(a)
  // client.close();
  // });



//Nba GET request stuff

//   res.send("NBA Prediction System")
//   const axios = require('axios')
//   //console.log("HERE\n")
//   // An api key is emailed to you when you sign up to a plan
//   const api_key = '8b00b7567b859bd2664a484dbb835c95'
//
//   // Get a list of in season sports
//   axios.get('https://api.the-odds-api.com/v3/sports', {
//       params: {
//           api_key: api_key
//       }
//   }).then(response => {
//
//       console.log(
//           `Successfully got ${response.data.data.length} sports.`,
//           `NBA\n:`
//       )
//
//       console.log(response.data.data[0])
//   })
//   .catch(error => {
//       console.log('Error status', error.response.status)
//       console.log(error.response.data)
//   })
//
//   // To get odds for a sepcific sport, use the sport key from the last request
//   //   or set sport to "upcoming" to see live and upcoming across all sports
//   let sport_key = 'basketball_nba'
//
//
//   axios.get('https://api.the-odds-api.com/v3/odds', {
//       params: {
//           api_key: api_key,
//           sport: sport_key,
//           region: 'us', // uk | us | au
//           mkt: 'h2h' // h2h | spreads | totals
//       }
//   }).then(response => {
//       // odds_json['data'] contains a list of live and
//       //   upcoming events and odds for different bookmakers.
//       // Events are ordered by start time (live events are first)
//       console.log(
//           `Successfully got ${response.data.data.length} events`,
//           `Here's the first event:`
//       )
//       console.log(JSON.stringify(response.data.data[0]))
//
//       // Check your usage
//       console.log()
//       console.log('Remaining requests',response.headers['x-requests-remaining'])
//       console.log('Used requests',response.headers['x-requests-used'])
//
//   })
//   .catch(error => {
//       console.log('Error status', error.response.status)
//       console.log(error.response.data)
//   })
// });
