// web.js
var express = require("express");
	logfmt = require("logfmt");
	ejs = require("ejs");
	fs  = require("fs");
	exphbs = require("express3-handlebars");
	publications = require("./routes/publications.js");


var app = express();


app.use(logfmt.requestLogger());


app.configure(function(){
	app.use(logfmt.requestLogger());
	app.use(express.json());
	app.use("/", express.static(__dirname+"/"));

	hbs = exphbs.create({
	    // Specify helpers which are only registered on this instance.
   		helpers: {
        	foo: function () { return 'FOO!'; },
        	bar: function () { return 'BAR!'; },
        	list: function(context, options) {
				var ret = "<ul>";
				for(var i=0, j=context.length; i<j; i++) {
					ret = ret + "<li>" + options.fn(context[i]) + "</li>";
				}
				return ret + "</ul>";
			}
	    }
	});

	app.engine('handlebars', hbs.engine);
	app.set('view engine', 'handlebars');
	app.engine('.html', require('ejs').__express);
	// add other things to serve here
});


app.get('/', function (req, res, next) {
    var context = {
		title: "My First Blog Post!",
		author: {
			id: 47,
			name: "Yehuda Katz"
		},
		body: "My first post. Wheeeee!",
		showTitle: true
	};
    res.send('index.html');
});


app.get('/publications/', publications.getPapers);
app.get('/publications/:id', publications.getPaperByID);


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});