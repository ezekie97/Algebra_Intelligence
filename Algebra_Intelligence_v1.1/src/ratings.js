var Mongo = require("mongodb");
/**
 * Get the users skill levels from the database.
 * @param username The username
 * @param callback Callback function that is called upon completion of the asynchronous call.
 */
exports.getRatings = function(username,callback){
    var url = 'mongodb://localhost:27017/algebra_intelligence';
    // Use connect method to connect to the Server
    Mongo.MongoClient.connect(url, function (err, db) {
        getUserRatings(db, {"username": username}, function (results) {
            delete results.username;
            delete results.pass;
            delete results._id;
            db.close();
            callback(results);
        });
    });
}

/**
 * Get the user's ratings from the Mongodb database.
 * @param db the database, should be 'algebra_intelligence'
 * @param jsonQuery the query to be made.
 * @param callback Callback function that is called upon completion of the asynchronous call.
 */
var getUserRatings = function (db, jsonQuery, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    // Find some documents
    collection.find(jsonQuery).toArray(function (err, results) {
        // since users are unique, this should be fine.
        callback(results[0]);
    });
}