var mongo = require("mongodb");

exports.getRatings = function(user,callback){
    var url = 'mongodb://localhost:27017/algebra_intelligence';
    // Use connect method to connect to the Server
    mongo.MongoClient.connect(url, function (err, db) {
        getUserRatings(db, {"username": user}, function (results) {
            delete results.username;
            delete results.pass;
            delete results._id;
            db.close();
            callback(results);
        });
    });
}

var getUserRatings = function (db, jsonQuery, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    // Find some documents
    collection.find(jsonQuery).toArray(function (err, results) {
        // since users are unique, this should be fine.
        callback(results[0]);
    });
}