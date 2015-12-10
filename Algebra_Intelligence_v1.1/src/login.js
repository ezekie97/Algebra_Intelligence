var Mongo = require('mongodb');
var Crypto = require('crypto');

/**
 * Check if a user's login and password matches with
 * any data in the user collection.
 * @param username String representing the entered username.
 * @param password String representing the entered password.
 * @param callback Callback function to be performed upon completion of the asynchronous call.
 */
exports.verifyLogin = function (username, password, callback) {
    var md5 = Crypto.createHash("md5");
    md5.update(password);
    var hashedPass = md5.digest("hex");

    var url = 'mongodb://localhost:27017/algebra_intelligence';
    // Use connect method to connect to the Server
    Mongo.MongoClient.connect(url, function (err, db) {

        confirmPassword(db, {"username": username, "pass": hashedPass}, function (valid) {
            db.close();
            callback(valid);
        });
    });
};

/**
 * Confirm if a password is correct.
 * @param db the Mongo database, should be the algebra_intelligence database.
 * @param jsonQuery a search query in JSON format.
 * @param callback Callback function to be performed upon completion of the asynchronous call.
 */
var confirmPassword = function (db, jsonQuery, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    // Find some documents
    collection.find(jsonQuery).toArray(function (err, results) {
        callback(results.length > 0);
    });
};
