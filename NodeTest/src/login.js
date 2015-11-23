var mongo = require('mongodb');
/**
 * Check if a user's login and password matches with
 * any data in the user collection.
 * @return {boolean} True if the password of the username is correct.
 */
exports.verifyLogin = function (username, password, callback) {
    var url = 'mongodb://localhost:27017/algebra_intelligence';
// Use connect method to connect to the Server
    mongo.MongoClient.connect(url, function (err, db) {
        confirmPassword(db, {"username": username,"pass":password},username,password, function (valid) {
            db.close();
            callback(valid);
        });
    });
}

var confirmPassword = function (db, jsonQuery, user, pass, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    // Find some documents
    collection.find(jsonQuery).toArray(function (err, results) {
        callback(results.length > 0);
    });
}