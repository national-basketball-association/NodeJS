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
var teamRoutes = require("./routes/teams");

// set view engine
app.set('view engine', 'pug');
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoutes);
app.use("/teams", teamRoutes);

app.listen(process.env.PORT || 8080);
