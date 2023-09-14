
// index.js
// where your node app starts

require('dotenv').config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// All Exam endpint...
app.get('/api', (req, res) => {
  let date = new Date();

  res.json({ 
    "unix": date.getTime(),
    "utc": date.toGMTString()
  });
});


app.get('/api/:date', (req, res) => {
  let param = req.params.date;
  let date = !isNaN(param) 
        ? new Date(Number(param)) 
        : new Date(param);

  if (date == undefined || date == 'Invalid Date') {
    res.json({ error : "Invalid Date" });
    return;
  }

  res.json({ 
    "unix": date.getTime(),
    "utc": date.toGMTString()
    });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on http://localhost:' + listener.address().port); 
});
