// ** configuration **
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 8000;

// var path = require("path");

app.use(bodyParser.json());

// ** express setting **
app.use(express.static(__dirname + '/public/dist/public'));

require('./server/config/mongoose')()
require('./server/config/routes')(app)

// ** server up */
app.listen(port, function(){
    console.log("listening on port " + port);
});
