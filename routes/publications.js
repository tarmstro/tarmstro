// publications.js
var mongo = require("mongodb");
	mongoUri = process.env.MONGOHQ_URL;


exports.getPapers = function (req, res, next) {
	mongo.Db.connect(mongoUri, function (err, db) {
		db.collection('publications', function(err, collection){
			collection.find().toArray(function(err, items) {
				console.log(items);
				res.render('publications', items);
			});
		});
	});
};


exports.getPaperByID = function (req, res) {
	var id = req.params.id;
	mongo.Db.connect(mongoUri, function (err, db) {
		db.collection('publications', function(err, collection) {
			BSON = mongo.BSONPure;
			collection.findOne({"_id": new BSON.ObjectID(id)}, function(err, item) {
				console.log(item);
				res.render('publications', item);
			});
		});
	});
};


// Just for testing purposes...then get rid of this.
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


// populateDB();