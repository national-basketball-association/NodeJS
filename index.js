'use strict'

let express = require('express');
let app = express();
let PORT = process.env.PORT || 3000;
let stats = require('./routes/stats') (app);

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!');
});
