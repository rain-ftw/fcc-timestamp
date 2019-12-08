// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
/*app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});*/


app.get('/api/timestamp/:date_string', (req,res) => {

    let d = req.params.date_string;
    let unix = '';
    let utc = '';
    if(!isNaN(new Date(d))){
         d = new Date(d);
         unix = d.getTime();
         utc  = d.toUTCString();
         res.json({'unix':unix,'utc':utc});
    }
    else if(!isNaN(d*1)){
        d = new Date(parseInt(d));
        unix = d.getTime();
        utc  = d.toUTCString();
        res.json({'unix':unix,'utc':utc});
    }
    else{
      res.json({'error': 'Invalid Date'});
    }   
});

app.get('/api/timestamp/',(req,res) => {
    res.json({'unix':new Date().getTime(),'utc':new Date().toUTCString()});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});