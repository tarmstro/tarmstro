// publications.js
var mongo = require("mongodb");
	mongoUri = process.env.MONGOHQ_URL;


exports.getPapers = function (req, res, next) {
	mongo.Db.connect(mongoUri, function (err, db) {
		db.collection('publications', function(err, collection){
			collection.find().toArray(function(err, items) {
				items.sort(function(x, y) { return parseInt(y.year) - parseInt(x.year); });
				var context = {"papers": items};
				console.log(context);
				res.render('publist', context);
			});
		});
	});
};

var populateDB = function() {
 	fs.readFile("public/data/pubs.json", function(err, f){
 		var papers = JSON.parse(f.toString());
 		mongo.Db.connect(mongoUri, function (err, db) {
 			db.collection('publications', function(err, collection){
 				collection.remove({}, {}, function(err, result) {});
 				collection.insert(papers, {safe: true}, function(err, result) {});
   			});
 		}); 
 	}); 
 };
 
 populateDB();