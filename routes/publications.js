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