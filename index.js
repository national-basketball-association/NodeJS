'use strict'

let express = require('express');
let app = express();
let PORT = process.env.PORT || 3000;
//let stats = require('./routes/stats') (app);

app.listen(PORT, function () {
  console.log('App listening on port 3000!');
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://rohanrao35:Npsnps407407@cluster0-8eolw.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
// const collection = client.db("NPS").collection("Teams");
// // perform actions on the collection object
// collection.insertOne({'ID': 40, 'Location': 'aa'})
// client.close();
// });





app.get('/', function(req, res){



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


  res.send("NBA Prediction System")
  const axios = require('axios')
  //console.log("HERE\n")
  // An api key is emailed to you when you sign up to a plan
  const api_key = '8b00b7567b859bd2664a484dbb835c95'

  // Get a list of in season sports
  axios.get('https://api.the-odds-api.com/v3/sports', {
      params: {
          api_key: api_key
      }
  }).then(response => {

      console.log(
          `Successfully got ${response.data.data.length} sports.`,
          `NBA\n:`
      )

      console.log(response.data.data[0])
  })
  .catch(error => {
      console.log('Error status', error.response.status)
      console.log(error.response.data)
  })

  // To get odds for a sepcific sport, use the sport key from the last request
  //   or set sport to "upcoming" to see live and upcoming across all sports
  let sport_key = 'basketball_nba'


  axios.get('https://api.the-odds-api.com/v3/odds', {
      params: {
          api_key: api_key,
          sport: sport_key,
          region: 'us', // uk | us | au
          mkt: 'h2h' // h2h | spreads | totals
      }
  }).then(response => {
      // odds_json['data'] contains a list of live and
      //   upcoming events and odds for different bookmakers.
      // Events are ordered by start time (live events are first)
      console.log(
          `Successfully got ${response.data.data.length} events`,
          `Here's the first event:`
      )
      console.log(JSON.stringify(response.data.data[0]))

      // Check your usage
      console.log()
      console.log('Remaining requests',response.headers['x-requests-remaining'])
      console.log('Used requests',response.headers['x-requests-used'])

  })
  .catch(error => {
      console.log('Error status', error.response.status)
      console.log(error.response.data)
  })
});
