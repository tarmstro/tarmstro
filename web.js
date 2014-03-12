// web.js
var express = require("express");
	logfmt = require("logfmt");
	ejs = require("ejs");
	fs  = require("fs");
	hbs = require("express3-handlebars").create();
	publications = require("./routes/publications.js");

var app = express();

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
  app.use(function(error, req, res, next) { res.send('500: Internal Server Error', 500); });
});

app.use(logfmt.requestLogger());


app.configure(function(){
	app.use(logfmt.requestLogger());
	app.use(express.json());
	app.use("/", express.static(__dirname+"/public"));
	app.engine('hbs', hbs.engine);
	app.set('view engine', 'hbs');
	app.engine('.html', require('ejs').__express);
	// add other things to serve here
});


app.get('/', function (req, res, next) { res.render('index',{}); });
app.get('/publications/', publications.getPapers);
app.get('/publications/:id', publications.getPaperByID);
app.use(function(req, res) { res.send('404: Page not Found', 404); });


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});