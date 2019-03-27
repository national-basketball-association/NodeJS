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

// requrie variables
let express = require('express');
let app = express();
const pug = require('pug');

// requiring routes
var indexRoutes = require("./routes/index");

// set view engine
app.set('view engine', 'pug');

app.use("/", indexRoutes);

app.listen(8080);

// // MONGODB
// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
//
// // connection URL
// const uri = "mongodb+srv://rohanrao35:Npsnps407407@cluster0-8eolw.mongodb.net/test?retryWrites=true";
//
// // Database name
// const dbName = 'NPS';
//
// // create a MongoClient
// const client = new MongoClient(uri, { useNewUrlParser: true });
